import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PrismaService } from '../common/prisma.service';
import { RedisService } from '../common/redis.service';
import { isRedisEnabled } from '../common/runtime-flags';
import { Fund, FundMarket, NavHistory } from '../generated/prisma';
import type {
  AmfiNavRecord,
  FundData,
  UsaFundQuote,
} from '../market-data/market-data.types';
import { DATA_FRESHNESS_MAX_AGE_MS } from '../market-data/market-data.types';

export interface FundFilters {
  market?: string;
  search?: string;
  sort?: string;
  dir?: string;
  page?: number | string;
  limit?: number | string;
}

export type FundDetail = Fund & { history: NavHistory[] };

export interface SummaryStats {
  totalFunds: number;
  indiaFunds: number;
  usaFunds: number;
  internationalFunds: number;
  averageChangePercent: number;
  topGainers: Fund[];
  topLosers: Fund[];
  lastSyncedAt: Date | null;
}

@Injectable()
export class FundsService {
  private readonly logger = new Logger(FundsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
    @InjectQueue('fund-sync') private readonly fundSyncQueue: Queue,
  ) {}

  /**
   * Returns active funds using market, search, sort, and pagination filters.
   */
  async getAllFunds(filters: FundFilters): Promise<Fund[]> {
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

    const cached = await this.getCached<Fund[]>(cacheKey);
    if (cached) return cached;

    const where: any = { isActive: true };
    if (market) where.market = market;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { amcName: { contains: search, mode: 'insensitive' } },
        { schemeCode: { contains: search } },
      ];
    }

    const funds = await this.prisma.fund.findMany({
      where,
      orderBy: [{ [sortField]: sortDir }, { name: 'asc' }] as any,
      skip: (page - 1) * limit,
      take: limit,
    });

    await this.setCached(cacheKey, funds, 5 * 60);
    return funds;
  }

  /**
   * Returns one fund by id or scheme code, including the latest NAV history points.
   */
  async getFundById(id: string): Promise<FundDetail> {
    const cacheKey = `funds:detail:${id}`;
    const cached = await this.getCached<FundDetail>(cacheKey);
    if (cached) return cached;

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
      throw new NotFoundException(`Fund with ID ${id} not found`);
    }

    await this.setCached(cacheKey, fund, 10 * 60);
    return fund;
  }

  /**
   * Returns NAV history for one fund by id or scheme code.
   */
  async getFundHistory(id: string, days = 30): Promise<NavHistory[]> {
    const normalizedDays = Math.max(1, Number(days) || 30);
    const cacheKey = `funds:history:${id}:${normalizedDays}`;
    const cached = await this.getCached<NavHistory[]>(cacheKey);
    if (cached) return cached;

    const fund = await this.prisma.fund.findFirst({
      where: {
        OR: [{ id }, { schemeCode: id }],
        isActive: true,
      },
      select: { id: true },
    });

    if (!fund) {
      throw new NotFoundException(`Fund with ID ${id} not found`);
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

  /**
   * Returns aggregate fund counts, average change, top movers, and latest sync time.
   */
  async getSummaryStats(): Promise<SummaryStats> {
    const cacheKey = 'funds:stats:summary';
    const cached = await this.getCached<SummaryStats>(cacheKey);
    if (cached) return cached;

    const [
      totalFunds,
      indiaFunds,
      usaFunds,
      internationalFunds,
      averageChange,
      topGainers,
      topLosers,
      latestSync,
    ] = await Promise.all([
      this.prisma.fund.count({ where: { isActive: true } }),
      this.prisma.fund.count({
        where: { isActive: true, market: FundMarket.INDIA },
      }),
      this.prisma.fund.count({
        where: { isActive: true, market: FundMarket.USA },
      }),
      this.prisma.fund.count({
        where: { isActive: true, market: FundMarket.INTERNATIONAL },
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

  /**
   * Upserts priority Indian funds fetched from mfapi.in and their NAV histories.
   */
  async upsertFundsFromMfApi(data: FundData[]): Promise<void> {
    const now = new Date();

    for (const fundData of data) {
      const latest = fundData.history[0];
      if (!latest) continue;

      const fund = await this.prisma.fund.upsert({
        where: { schemeCode: fundData.meta.schemeCode },
        update: {
          name: fundData.meta.schemeName,
          category: fundData.meta.schemeCategory || 'Equity',
          subCategory: fundData.meta.schemeType || '',
          amcName: fundData.meta.fundHouse || '',
          market: FundMarket.INDIA,
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
          market: FundMarket.INDIA,
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

  /**
   * Upserts AMFI bulk NAV records into Fund and NavHistory tables.
   */
  async upsertFundsFromAmfi(data: AmfiNavRecord[]): Promise<void> {
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
      const existingByCode = new Map(
        existingFunds.map((fund) => [fund.schemeCode, fund]),
      );

      for (const record of records) {
        const existing = existingByCode.get(record.schemeCode);
        const prevNav = existing?.nav;
        const changePercent =
          prevNav && prevNav > 0
            ? ((record.nav - prevNav) / prevNav) * 100
            : undefined;

        const fund = await this.prisma.fund.upsert({
          where: { schemeCode: record.schemeCode },
          update: {
            name: record.name,
            category:
              existing?.category && existing.category !== 'Equity'
                ? existing.category
                : this.inferCategory(record.name),
            subCategory: existing?.subCategory || '',
            amcName: existing?.amcName || this.inferAmcName(record.name),
            market: FundMarket.INDIA,
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
            market: FundMarket.INDIA,
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

  /**
   * Upserts USA mutual fund quotes fetched from Alpha Vantage.
   */
  async upsertUsaFunds(data: UsaFundQuote[]): Promise<void> {
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
          market: FundMarket.USA,
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
          market: FundMarket.USA,
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

  /**
   * Enqueues all fund-data refresh jobs for an admin-triggered manual refresh.
   */
  async triggerManualRefresh(): Promise<{ queued: string[] }> {
    if (!isRedisEnabled()) {
      this.logger.warn(
        'Redis is disabled; manual fund refresh jobs were not queued',
      );
      return { queued: [] };
    }

    const options = {
      attempts: 3,
      backoff: { type: 'exponential' as const, delay: 5000 },
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

  /**
   * Returns stale when the newest synced fund is older than the configured freshness window.
   */
  async getDataFreshness(): Promise<'fresh' | 'stale'> {
    const latest = await this.prisma.fund.aggregate({
      where: { isActive: true },
      _max: { lastSyncedAt: true },
    });

    const lastSyncedAt = latest._max.lastSyncedAt;
    if (!lastSyncedAt) return 'stale';

    return Date.now() - lastSyncedAt.getTime() > DATA_FRESHNESS_MAX_AGE_MS
      ? 'stale'
      : 'fresh';
  }

  /**
   * Backward-compatible list endpoint used by older backend routes.
   */
  async findAll(params: {
    skip?: number;
    take?: number;
    category?: string;
    search?: string;
  }) {
    const page =
      params.skip && params.take
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

  /**
   * Backward-compatible fund lookup used by older backend routes.
   */
  async findOne(id: string): Promise<FundDetail> {
    return this.getFundById(id);
  }

  /**
   * Backward-compatible NAV history lookup used by older backend routes.
   */
  async getNavHistory(id: string, limit = 365): Promise<NavHistory[]> {
    return this.getFundHistory(id, limit);
  }

  /**
   * Returns distinct fund categories.
   */
  async getCategories(): Promise<string[]> {
    const categories = await this.prisma.fund.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });
    return categories.map((category) => category.category);
  }

  private async upsertHistoryPoints(
    fundId: string,
    history: { nav: number; date: Date }[],
  ): Promise<void> {
    const points = history.filter((point) => Number.isFinite(point.nav));
    for (const chunk of this.chunk(points, 100)) {
      await this.prisma.$transaction(
        chunk.map((point) =>
          this.prisma.navHistory.upsert({
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
          }),
        ),
      );
    }
  }

  private resolveMarket(market?: string): FundMarket | undefined {
    const normalized = market?.toUpperCase();
    if (!normalized || normalized === 'ALL') return undefined;

    return Object.values(FundMarket).includes(normalized as FundMarket)
      ? (normalized as FundMarket)
      : undefined;
  }

  private getFundsListCacheKey(parts: {
    market: string;
    sort: string;
    dir: string;
    page: number;
    limit: number;
    search?: string;
  }): string {
    const search = parts.search
      ? Buffer.from(parts.search).toString('base64url')
      : 'all';
    return `funds:all:${parts.market}:${parts.sort}:${parts.dir}:${parts.page}:${parts.limit}:${search}`;
  }

  private async getCached<T>(key: string): Promise<T | null> {
    try {
      return await this.redisService.getJson<T>(key);
    } catch (error) {
      this.logger.warn(`Redis cache read failed for ${key}: ${error.message}`);
      return null;
    }
  }

  private async setCached<T>(
    key: string,
    value: T,
    ttlSeconds: number,
  ): Promise<void> {
    try {
      await this.redisService.setJson(key, value, ttlSeconds);
    } catch (error) {
      this.logger.warn(`Redis cache write failed for ${key}: ${error.message}`);
    }
  }

  private async invalidateFundCaches(): Promise<void> {
    try {
      const client = this.redisService.getClient();
      let cursor = '0';

      do {
        const [nextCursor, keys] = await client.scan(
          cursor,
          'MATCH',
          'funds:*',
          'COUNT',
          200,
        );
        cursor = nextCursor;
        if (keys.length) {
          await client.del(...keys);
        }
      } while (cursor !== '0');
    } catch (error) {
      this.logger.warn(`Redis cache invalidation failed: ${error.message}`);
    }
  }

  private startOfUtcDay(date: Date): Date {
    return new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
  }

  private inferCategory(name: string): string {
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

  private inferAmcName(name: string): string {
    const words = name.split(/\s+/).filter(Boolean);
    return words.slice(0, Math.min(words.length, 4)).join(' ') || 'Unknown';
  }

  private inferUsCategory(symbol: string): string {
    return ['VFIAX', 'FXAIX', 'VTSAX', 'VTSMX'].includes(symbol)
      ? 'Index Fund'
      : 'Equity';
  }

  private inferUsAmcName(symbol: string): string {
    if (
      symbol.startsWith('VF') ||
      symbol.startsWith('VT') ||
      symbol === 'VWELX'
    ) {
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

  private chunk<T>(items: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let index = 0; index < items.length; index += size) {
      chunks.push(items.slice(index, index + size));
    }
    return chunks;
  }
}
