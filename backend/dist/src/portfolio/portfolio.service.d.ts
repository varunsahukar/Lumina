import { PrismaService } from '../common/prisma.service';
export declare class PortfolioService {
    private prisma;
    constructor(prisma: PrismaService);
    createPortfolio(userId: string, name: string): Promise<{
        userId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getPortfolios(userId: string): Promise<({
        holdings: ({
            fund: {
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
            };
        } & {
            portfolioId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fundId: string;
            units: import("@prisma/client-runtime-utils").Decimal;
            avgNav: import("@prisma/client-runtime-utils").Decimal;
            investedAmount: import("@prisma/client-runtime-utils").Decimal;
            purchaseDate: Date | null;
        })[];
    } & {
        userId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getPortfolioValuation(portfolioId: string): Promise<{
        portfolioId: string;
        portfolioName: string;
        totalInvested: number;
        totalCurrentValue: number;
        totalProfitLoss: number;
        absoluteReturnPct: number;
        xirrPct: number;
        holdings: {
            holdingId: string;
            fundId: string;
            schemeName: string;
            name: string;
            units: number;
            avgNav: number;
            currentNav: number;
            investedAmount: number;
            currentValue: number;
            profitLoss: number;
            returnsPct: number;
        }[];
    }>;
    private calculatePortfolioXirr;
    private solveXirr;
}
