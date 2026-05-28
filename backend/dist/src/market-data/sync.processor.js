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
var FundSyncProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundSyncProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../common/prisma.service");
const redis_service_1 = require("../common/redis.service");
const funds_service_1 = require("../funds/funds.service");
const amfi_service_1 = require("./india/amfi.service");
const mfapi_service_1 = require("./india/mfapi.service");
const market_data_types_1 = require("./market-data.types");
const alpha_vantage_service_1 = require("./usa/alpha-vantage.service");
let FundSyncProcessor = FundSyncProcessor_1 = class FundSyncProcessor extends bullmq_1.WorkerHost {
    mfApiService;
    amfiService;
    alphaVantageService;
    fundsService;
    prisma;
    redisService;
    configService;
    logger = new common_1.Logger(FundSyncProcessor_1.name);
    constructor(mfApiService, amfiService, alphaVantageService, fundsService, prisma, redisService, configService) {
        super();
        this.mfApiService = mfApiService;
        this.amfiService = amfiService;
        this.alphaVantageService = alphaVantageService;
        this.fundsService = fundsService;
        this.prisma = prisma;
        this.redisService = redisService;
        this.configService = configService;
    }
    async process(job) {
        this.logger.log(`Processing ${job.name} job ${job.id}`);
        switch (job.name) {
            case 'sync-india-funds':
                return this.syncIndiaFunds(job);
            case 'sync-usa-funds':
                return this.syncUsaFunds(job);
            case 'sync-amfi-bulk':
                return this.syncAmfiBulk();
            default:
                throw new Error(`Unsupported fund sync job: ${job.name}`);
        }
    }
    async syncIndiaFunds(job) {
        const startedAt = Date.now();
        const codes = this.resolveIndiaSchemeCodes(job.data);
        const data = await this.mfApiService.bulkFetchFunds(codes);
        const errors = this.mfApiService.getLastBulkErrors();
        if (data.length > 0) {
            await this.fundsService.upsertFundsFromMfApi(data);
        }
        const status = errors.length || data.length < codes.length ? 'PARTIAL' : 'SUCCESS';
        await this.prisma.syncLog.create({
            data: {
                source: 'MFAPI',
                status,
                fundsSync: data.length,
                errors,
                duration: Date.now() - startedAt,
            },
        });
        if (status === 'PARTIAL') {
            this.logger.warn(`mfapi.in sync completed partially (${data.length}/${codes.length}); stale DB values remain available`);
        }
        return { status, fundsSync: data.length };
    }
    async syncUsaFunds(job) {
        const startedAt = Date.now();
        try {
            const quotes = await this.alphaVantageService.fetchAllQuotes();
            await this.fundsService.upsertUsaFunds(quotes);
            const errors = this.alphaVantageService.getLastFetchErrors();
            const requestedTickers = this.resolveUsaTickers(job.data);
            const status = errors.length || quotes.length < requestedTickers.length
                ? 'PARTIAL'
                : 'SUCCESS';
            await this.prisma.syncLog.create({
                data: {
                    source: 'ALPHA_VANTAGE',
                    status,
                    fundsSync: quotes.length,
                    errors,
                    duration: Date.now() - startedAt,
                },
            });
            return { status, fundsSync: quotes.length };
        }
        catch (error) {
            await this.prisma.syncLog.create({
                data: {
                    source: 'ALPHA_VANTAGE',
                    status: 'FAILED',
                    fundsSync: 0,
                    errors: [error?.message || String(error)],
                    duration: Date.now() - startedAt,
                },
            });
            if (error instanceof alpha_vantage_service_1.ConfigException) {
                this.logger.error(error.message);
            }
            throw error;
        }
    }
    async syncAmfiBulk() {
        const startedAt = Date.now();
        try {
            const records = await this.amfiService.fetchBulkNav();
            await this.fundsService.upsertFundsFromAmfi(records);
            await this.redisService.set('amfi:last_sync', new Date().toISOString());
            await this.prisma.syncLog.create({
                data: {
                    source: 'AMFI',
                    status: 'SUCCESS',
                    fundsSync: records.length,
                    errors: [],
                    duration: Date.now() - startedAt,
                },
            });
            return { status: 'SUCCESS', fundsSync: records.length };
        }
        catch (error) {
            const message = error?.message || String(error);
            const timestamp = new Date().toISOString();
            console.error(`[${timestamp}] AMFI bulk sync job failed: ${message}`);
            await this.prisma.syncLog.create({
                data: {
                    source: 'AMFI',
                    status: 'FAILED',
                    fundsSync: 0,
                    errors: [message],
                    duration: Date.now() - startedAt,
                },
            });
            throw error;
        }
    }
    resolveIndiaSchemeCodes(data) {
        const fromJob = this.getStringArray(data, 'codes');
        const configured = this.configService.get('INDIA_SCHEME_CODES');
        const codes = fromJob.length > 0
            ? fromJob
            : configured
                ? configured.split(',')
                : market_data_types_1.DEFAULT_INDIA_SCHEME_CODES;
        return [...new Set(codes.map((code) => code.trim()).filter(Boolean))];
    }
    resolveUsaTickers(data) {
        const fromJob = this.getStringArray(data, 'tickers');
        const configured = this.configService.get('USA_TICKERS');
        const tickers = fromJob.length > 0
            ? fromJob
            : configured
                ? configured.split(',')
                : market_data_types_1.DEFAULT_USA_TICKERS;
        return [...new Set(tickers.map((ticker) => ticker.trim()).filter(Boolean))];
    }
    getStringArray(data, key) {
        if (!data || typeof data !== 'object')
            return [];
        const value = data[key];
        return Array.isArray(value)
            ? value.filter((item) => typeof item === 'string')
            : [];
    }
};
exports.FundSyncProcessor = FundSyncProcessor;
exports.FundSyncProcessor = FundSyncProcessor = FundSyncProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    (0, bullmq_1.Processor)('fund-sync'),
    __metadata("design:paramtypes", [mfapi_service_1.MfApiService,
        amfi_service_1.AmfiService,
        alpha_vantage_service_1.AlphaVantageService,
        funds_service_1.FundsService,
        prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        config_1.ConfigService])
], FundSyncProcessor);
//# sourceMappingURL=sync.processor.js.map