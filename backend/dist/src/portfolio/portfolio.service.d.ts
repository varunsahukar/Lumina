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
                id: string;
                createdAt: Date;
                updatedAt: Date;
                schemeCode: string;
                schemeName: string;
                amcName: string;
                category: string;
                subCategory: string | null;
                nav: import("@prisma/client-runtime-utils").Decimal;
                aum: import("@prisma/client-runtime-utils").Decimal | null;
                expenseRatio: import("@prisma/client-runtime-utils").Decimal | null;
                sharpeRatio: import("@prisma/client-runtime-utils").Decimal | null;
                alpha: import("@prisma/client-runtime-utils").Decimal | null;
                beta: import("@prisma/client-runtime-utils").Decimal | null;
                stdDeviation: import("@prisma/client-runtime-utils").Decimal | null;
                returns1y: import("@prisma/client-runtime-utils").Decimal | null;
                returns3y: import("@prisma/client-runtime-utils").Decimal | null;
                returns5y: import("@prisma/client-runtime-utils").Decimal | null;
                returns10y: import("@prisma/client-runtime-utils").Decimal | null;
                managerName: string | null;
                launchDate: Date | null;
                benchmarkIndex: string | null;
                isActive: boolean;
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
