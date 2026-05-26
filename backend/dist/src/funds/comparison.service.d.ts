import { PrismaService } from '../common/prisma.service';
export declare class ComparisonService {
    private prisma;
    constructor(prisma: PrismaService);
    compareFunds(fundIds: string[]): Promise<{
        comparedFunds: {
            id: string;
            schemeName: string;
            schemeCode: string;
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
            benchmarkIndex: string | null;
            navTrend: {
                date: Date;
                nav: import("@prisma/client-runtime-utils").Decimal;
            }[];
        }[];
        bestPerformer1y: string | null;
        bestPerformer3y: string | null;
        lowestExpenseRatio: string | null;
        highestSharpeRatio: string | null;
    }>;
}
