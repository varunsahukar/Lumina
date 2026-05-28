import { Queue } from 'bullmq';
import { PrismaService } from '../common/prisma.service';
import { RedisService } from '../common/redis.service';
import { Fund, NavHistory } from '../generated/prisma';
import type { AmfiNavRecord, FundData, UsaFundQuote } from '../market-data/market-data.types';
export interface FundFilters {
    market?: 'INDIA' | 'USA' | 'INTERNATIONAL' | 'ALL' | string;
    search?: string;
    sort?: 'nav' | 'change' | string;
    dir?: 'asc' | 'desc' | string;
    page?: number | string;
    limit?: number | string;
}
export type FundDetail = Fund & {
    history: NavHistory[];
};
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
export declare class FundsService {
    private readonly prisma;
    private readonly redisService;
    private readonly fundSyncQueue;
    private readonly logger;
    constructor(prisma: PrismaService, redisService: RedisService, fundSyncQueue: Queue);
    getAllFunds(filters: FundFilters): Promise<Fund[]>;
    getFundById(id: string): Promise<FundDetail>;
    getFundHistory(id: string, days?: number): Promise<NavHistory[]>;
    getSummaryStats(): Promise<SummaryStats>;
    upsertFundsFromMfApi(data: FundData[]): Promise<void>;
    upsertFundsFromAmfi(data: AmfiNavRecord[]): Promise<void>;
    upsertUsaFunds(data: UsaFundQuote[]): Promise<void>;
    triggerManualRefresh(): Promise<{
        queued: string[];
    }>;
    getDataFreshness(): Promise<'fresh' | 'stale'>;
    findAll(params: {
        skip?: number;
        take?: number;
        category?: string;
        search?: string;
    }): Promise<{
        items: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            schemeCode: string;
            category: string;
            subCategory: string;
            amcName: string;
            market: import("../generated/prisma").$Enums.FundMarket;
            currency: string;
            nav: number;
            navDate: Date | null;
            prevNav: number | null;
            changePercent: number | null;
            aum: number | null;
            expenseRatio: number | null;
            minInvestment: number | null;
            sharpeRatio: number | null;
            alpha: number | null;
            beta: number | null;
            stdDeviation: number | null;
            returns1y: number | null;
            returns3y: number | null;
            returns5y: number | null;
            returns10y: number | null;
            managerName: string | null;
            launchDate: Date | null;
            benchmarkIndex: string | null;
            isActive: boolean;
            lastSyncedAt: Date | null;
        }[];
        total: number;
    }>;
    findOne(id: string): Promise<FundDetail>;
    getNavHistory(id: string, limit?: number): Promise<NavHistory[]>;
    getCategories(): Promise<string[]>;
    private upsertHistoryPoints;
    private resolveMarket;
    private getFundsListCacheKey;
    private getCached;
    private setCached;
    private invalidateFundCaches;
    private startOfUtcDay;
    private inferCategory;
    private inferAmcName;
    private inferUsCategory;
    private inferUsAmcName;
    private chunk;
}
