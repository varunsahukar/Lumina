import { PrismaService } from '../common/prisma.service';
export interface ScreenerFilterDto {
    category?: string;
    minAum?: number;
    maxExpenseRatio?: number;
    minSharpe?: number;
    minReturns1y?: number;
    minReturns3y?: number;
    minReturns5y?: number;
    sortBy?: 'aum' | 'sharpeRatio' | 'returns1y' | 'returns3y' | 'returns5y' | 'expenseRatio';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
}
export declare class ScreenerService {
    private prisma;
    constructor(prisma: PrismaService);
    screenFunds(filters: ScreenerFilterDto): Promise<{
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
    }[]>;
}
