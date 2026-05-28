"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FundsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundsService = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const prisma_service_1 = require("../common/prisma.service");
const redis_service_1 = require("../common/redis.service");
const runtime_flags_1 = require("../common/runtime-flags");
const prisma_1 = require("../generated/prisma");
const market_data_types_1 = require("../market-data/market-data.types");
let FundsService = FundsService_1 = class FundsService {
    prisma;
    redisService;
    fundSyncQueue;
    logger = new common_1.Logger(FundsService_1.name);
    constructor(prisma, redisService, fundSyncQueue) {
        this.prisma = prisma;
        this.redisService = redisService;
        this.fundSyncQueue = fundSyncQueue;
    }
    async getAllFunds(filters) {
        const market = this.resolveMarket(filters.market);
        const sortField = filters.sort === 'change' ? 'changePercent' : 'nav';
        const sortDir = filters.dir === 'asc' ? 'asc' : 'desc';
        const page = Math.max(1, Number(filters.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(filters.limit) || 50));
        const search = filters.search?.trim();
        const cacheKey = this.getFundsListCacheKey({
            market: market || 'ALL',
            sort: sortField,
            dir: sortDir,
            page,
            limit,
            search,
        });
        const cached = await this.getCached(cacheKey);
        if (cached)
            return cached;
        const where = { isActive: true };
        if (market)
            where.market = market;
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { amcName: { contains: search, mode: 'insensitive' } },
                { schemeCode: { contains: search } },
            ];
        }
        const funds = await this.prisma.fund.findMany({
            where,
            orderBy: [{ [sortField]: sortDir }, { name: 'asc' }],
            skip: (page - 1) * limit,
            take: limit,
        });
        await this.setCached(cacheKey, funds, 5 * 60);
        return funds;
    }
    async getFundById(id) {
        const cacheKey = `funds:detail:${id}`;
        const cached = await this.getCached(cacheKey);
        if (cached)
            return cached;
        const fund = await this.prisma.fund.findFirst({
            where: {
                OR: [{ id }, { schemeCode: id }],
                isActive: true,
            },
            include: {
                history: {
                    orderBy: { date: 'desc' },
                    take: 30,
                },
            },
        });
        if (!fund) {
            throw new common_1.NotFoundException(`Fund with ID ${id} not found`);
        }
        await this.setCached(cacheKey, fund, 10 * 60);
        return fund;
    }
    async getFundHistory(id, days = 30) {
        const normalizedDays = Math.max(1, Number(days) || 30);
        const cacheKey = `funds:history:${id}:${normalizedDays}`;
        const cached = await this.getCached(cacheKey);
        if (cached)
            return cached;
        const fund = await this.prisma.fund.findFirst({
            where: {
                OR: [{ id }, { schemeCode: id }],
                isActive: true,
            },
            select: { id: true },
        });
        if (!fund) {
            throw new common_1.NotFoundException(`Fund with ID ${id} not found`);
        }
        const since = new Date(Date.now() - normalizedDays * 24 * 60 * 60 * 1000);
        const history = await this.prisma.navHistory.findMany({
            where: {
                fundId: fund.id,
                date: { gte: this.startOfUtcDay(since) },
            },
            orderBy: { date: 'asc' },
        });
        await this.setCached(cacheKey, history, 60 * 60);
        return history;
    }
    async getSummaryStats() {
        const cacheKey = 'funds:stats:summary';
        const cached = await this.getCached(cacheKey);
        if (cached)
            return cached;
        const [totalFunds, indiaFunds, usaFunds, internationalFunds, averageChange, topGainers, topLosers, latestSync,] = await Promise.all([
            this.prisma.fund.count({ where: { isActive: true } }),
            this.prisma.fund.count({
                where: { isActive: true, market: prisma_1.FundMarket.INDIA },
            }),
            this.prisma.fund.count({
                where: { isActive: true, market: prisma_1.FundMarket.USA },
            }),
            this.prisma.fund.count({
                where: { isActive: true, market: prisma_1.FundMarket.INTERNATIONAL },
            }),
            this.prisma.fund.aggregate({
                where: { isActive: true },
                _avg: { changePercent: true },
            }),
            this.prisma.fund.findMany({
                where: { isActive: true, changePercent: { not: null } },
                orderBy: { changePercent: 'desc' },
                take: 5,
            }),
            this.prisma.fund.findMany({
                where: { isActive: true, changePercent: { not: null } },
                orderBy: { changePercent: 'asc' },
                take: 5,
            }),
            this.prisma.fund.aggregate({
                where: { isActive: true },
                _max: { lastSyncedAt: true },
            }),
        ]);
        const stats = {
            totalFunds,
            indiaFunds,
            usaFunds,
            internationalFunds,
            averageChangePercent: averageChange._avg.changePercent || 0,
            topGainers,
            topLosers,
            lastSyncedAt: latestSync._max.lastSyncedAt,
        };
        await this.setCached(cacheKey, stats, 5 * 60);
        return stats;
    }
    async upsertFundsFromMfApi(data) {
        const now = new Date();
        for (const fundData of data) {
            const latest = fundData.history[0];
            if (!latest)
                continue;
            const fund = await this.prisma.fund.upsert({
                where: { schemeCode: fundData.meta.schemeCode },
                update: {
                    name: fundData.meta.schemeName,
                    category: fundData.meta.schemeCategory || 'Equity',
                    subCategory: fundData.meta.schemeType || '',
                    amcName: fundData.meta.fundHouse || '',
                    market: prisma_1.FundMarket.INDIA,
                    currency: 'INR',
                    nav: latest.nav,
                    navDate: latest.date,
                    prevNav: fundData.previousNav,
                    changePercent: fundData.changePercent,
                    isActive: true,
                    lastSyncedAt: now,
                },
                create: {
                    schemeCode: fundData.meta.schemeCode,
                    name: fundData.meta.schemeName,
                    category: fundData.meta.schemeCategory || 'Equity',
                    subCategory: fundData.meta.schemeType || '',
                    amcName: fundData.meta.fundHouse || '',
                    market: prisma_1.FundMarket.INDIA,
                    currency: 'INR',
                    nav: latest.nav,
                    navDate: latest.date,
                    prevNav: fundData.previousNav,
                    changePercent: fundData.changePercent,
                    isActive: true,
                    lastSyncedAt: now,
                },
            });
            await this.upsertHistoryPoints(fund.id, fundData.history);
        }
        await this.invalidateFundCaches();
    }
    async upsertFundsFromAmfi(data) {
        const now = new Date();
        const chunks = this.chunk(data, 250);
        for (const records of chunks) {
            const existingFunds = await this.prisma.fund.findMany({
                where: {
                    schemeCode: { in: records.map((record) => record.schemeCode) },
                },
                select: {
                    id: true,
                    schemeCode: true,
                    nav: true,
                    category: true,
                    subCategory: true,
                    amcName: true,
                },
            });
            const existingByCode = new Map(existingFunds.map((fund) => [fund.schemeCode, fund]));
            for (const record of records) {
                const existing = existingByCode.get(record.schemeCode);
                const prevNav = existing?.nav;
                const changePercent = prevNav && prevNav > 0
                    ? ((record.nav - prevNav) / prevNav) * 100
                    : undefined;
                const fund = await this.prisma.fund.upsert({
                    where: { schemeCode: record.schemeCode },
                    update: {
                        name: record.name,
                        category: existing?.category && existing.category !== 'Equity'
                            ? existing.category
                            : this.inferCategory(record.name),
                        subCategory: existing?.subCategory || '',
                        amcName: existing?.amcName || this.inferAmcName(record.name),
                        market: prisma_1.FundMarket.INDIA,
                        currency: 'INR',
                        nav: record.nav,
                        navDate: record.date,
                        prevNav,
                        changePercent,
                        isActive: true,
                        lastSyncedAt: now,
                    },
                    create: {
                        schemeCode: record.schemeCode,
                        name: record.name,
                        category: this.inferCategory(record.name),
                        subCategory: '',
                        amcName: this.inferAmcName(record.name),
                        market: prisma_1.FundMarket.INDIA,
                        currency: 'INR',
                        nav: record.nav,
                        navDate: record.date,
                        prevNav,
                        changePercent,
                        isActive: true,
                        lastSyncedAt: now,
                    },
                });
                await this.upsertHistoryPoints(fund.id, [
                    { nav: record.nav, date: record.date },
                ]);
            }
        }
        await this.invalidateFundCaches();
    }
    async upsertUsaFunds(data) {
        const now = new Date();
        for (const quote of data) {
            const previousNav = quote.price - quote.change;
            const fund = await this.prisma.fund.upsert({
                where: { schemeCode: quote.symbol },
                update: {
                    name: quote.name,
                    category: this.inferUsCategory(quote.symbol),
                    subCategory: 'Mutual Fund',
                    amcName: this.inferUsAmcName(quote.symbol),
                    market: prisma_1.FundMarket.USA,
                    currency: quote.currency,
                    nav: quote.price,
                    navDate: quote.latestTradingDay,
                    prevNav: previousNav > 0 ? previousNav : undefined,
                    changePercent: quote.changePercent,
                    isActive: true,
                    lastSyncedAt: now,
                },
                create: {
                    schemeCode: quote.symbol,
                    name: quote.name,
                    category: this.inferUsCategory(quote.symbol),
                    subCategory: 'Mutual Fund',
                    amcName: this.inferUsAmcName(quote.symbol),
                    market: prisma_1.FundMarket.USA,
                    currency: quote.currency,
                    nav: quote.price,
                    navDate: quote.latestTradingDay,
                    prevNav: previousNav > 0 ? previousNav : undefined,
                    changePercent: quote.changePercent,
                    isActive: true,
                    lastSyncedAt: now,
                },
            });
            await this.upsertHistoryPoints(fund.id, [
                { nav: quote.price, date: quote.latestTradingDay },
            ]);
        }
        await this.invalidateFundCaches();
    }
    async triggerManualRefresh() {
        if (!(0, runtime_flags_1.isRedisEnabled)()) {
            this.logger.warn('Redis is disabled; manual fund refresh jobs were not queued');
            return { queued: [] };
        }
        const options = {
            attempts: 3,
            backoff: { type: 'exponential', delay: 5000 },
            removeOnComplete: 100,
            removeOnFail: 1000,
        };
        await Promise.all([
            this.fundSyncQueue.add('sync-india-funds', {}, options),
            this.fundSyncQueue.add('sync-usa-funds', {}, options),
            this.fundSyncQueue.add('sync-amfi-bulk', {}, options),
        ]);
        return {
            queued: ['sync-india-funds', 'sync-usa-funds', 'sync-amfi-bulk'],
        };
    }
    async getDataFreshness() {
        const latest = await this.prisma.fund.aggregate({
            where: { isActive: true },
            _max: { lastSyncedAt: true },
        });
        const lastSyncedAt = latest._max.lastSyncedAt;
        if (!lastSyncedAt)
            return 'stale';
        return Date.now() - lastSyncedAt.getTime() > market_data_types_1.DATA_FRESHNESS_MAX_AGE_MS
            ? 'stale'
            : 'fresh';
    }
    async findAll(params) {
        const page = params.skip && params.take
            ? Math.floor(Number(params.skip) / Number(params.take)) + 1
            : 1;
        return {
            items: await this.getAllFunds({
                search: params.search,
                page,
                limit: params.take || 50,
            }),
            total: await this.prisma.fund.count({
                where: {
                    isActive: true,
                    ...(params.category
                        ? { category: { equals: params.category, mode: 'insensitive' } }
                        : {}),
                },
            }),
        };
    }
    async findOne(id) {
        return this.getFundById(id);
    }
    async getNavHistory(id, limit = 365) {
        return this.getFundHistory(id, limit);
    }
    async getCategories() {
        const categories = await this.prisma.fund.findMany({
            select: { category: true },
            distinct: ['category'],
            orderBy: { category: 'asc' },
        });
        return categories.map((category) => category.category);
    }
    async upsertHistoryPoints(fundId, history) {
        const points = history.filter((point) => Number.isFinite(point.nav));
        for (const chunk of this.chunk(points, 100)) {
            await this.prisma.$transaction(chunk.map((point) => this.prisma.navHistory.upsert({
                where: {
                    fundId_date: {
                        fundId,
                        date: this.startOfUtcDay(point.date),
                    },
                },
                update: { nav: point.nav },
                create: {
                    fundId,
                    nav: point.nav,
                    date: this.startOfUtcDay(point.date),
                },
            })));
        }
    }
    resolveMarket(market) {
        const normalized = market?.toUpperCase();
        if (!normalized || normalized === 'ALL')
            return undefined;
        return Object.values(prisma_1.FundMarket).includes(normalized)
            ? normalized
            : undefined;
    }
    getFundsListCacheKey(parts) {
        const search = parts.search
            ? Buffer.from(parts.search).toString('base64url')
            : 'all';
        return `funds:all:${parts.market}:${parts.sort}:${parts.dir}:${parts.page}:${parts.limit}:${search}`;
    }
    async getCached(key) {
        try {
            return await this.redisService.getJson(key);
        }
        catch (error) {
            this.logger.warn(`Redis cache read failed for ${key}: ${error.message}`);
            return null;
        }
    }
    async setCached(key, value, ttlSeconds) {
        try {
            await this.redisService.setJson(key, value, ttlSeconds);
        }
        catch (error) {
            this.logger.warn(`Redis cache write failed for ${key}: ${error.message}`);
        }
    }
    async invalidateFundCaches() {
        try {
            const client = this.redisService.getClient();
            let cursor = '0';
            do {
                const [nextCursor, keys] = await client.scan(cursor, 'MATCH', 'funds:*', 'COUNT', 200);
                cursor = nextCursor;
                if (keys.length) {
                    await client.del(...keys);
                }
            } while (cursor !== '0');
        }
        catch (error) {
            this.logger.warn(`Redis cache invalidation failed: ${error.message}`);
        }
    }
    startOfUtcDay(date) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    }
    inferCategory(name) {
        const normalized = name.toLowerCase();
        if (normalized.includes('debt') || normalized.includes('bond')) {
            return 'Debt';
        }
        if (normalized.includes('hybrid') || normalized.includes('balanced')) {
            return 'Hybrid';
        }
        if (normalized.includes('index')) {
            return 'Index Fund';
        }
        if (normalized.includes('elss') || normalized.includes('tax saver')) {
            return 'Tax Saver';
        }
        return 'Equity';
    }
    inferAmcName(name) {
        const words = name.split(/\s+/).filter(Boolean);
        return words.slice(0, Math.min(words.length, 4)).join(' ') || 'Unknown';
    }
    inferUsCategory(symbol) {
        return ['VFIAX', 'FXAIX', 'VTSAX', 'VTSMX'].includes(symbol)
            ? 'Index Fund'
            : 'Equity';
    }
    inferUsAmcName(symbol) {
        if (symbol.startsWith('VF') ||
            symbol.startsWith('VT') ||
            symbol === 'VWELX') {
            return 'Vanguard';
        }
        if (symbol.startsWith('F')) {
            return 'Fidelity';
        }
        if (symbol.startsWith('PR')) {
            return 'T. Rowe Price';
        }
        if (symbol.startsWith('AG')) {
            return 'American Funds';
        }
        return 'USA Mutual Fund';
    }
    chunk(items, size) {
        const chunks = [];
        for (let index = 0; index < items.length; index += size) {
            chunks.push(items.slice(index, index + size));
        }
        return chunks;
    }
};
exports.FundsService = FundsService;
exports.FundsService = FundsService = FundsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bullmq_1.InjectQueue)('fund-sync')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        bullmq_2.Queue])
], FundsService);
//# sourceMappingURL=funds.service.js.map