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
    }[]>;
}
