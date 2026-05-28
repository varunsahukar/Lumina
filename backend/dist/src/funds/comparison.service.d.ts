import { PrismaService } from '../common/prisma.service';
export declare class ComparisonService {
    private prisma;
    constructor(prisma: PrismaService);
    compareFunds(fundIds: string[]): Promise<{
        comparedFunds: {
            id: string;
            schemeName: string;
            name: string;
            schemeCode: string;
            amcName: string;
            category: string;
            subCategory: string;
            nav: number;
            aum: number | null;
            expenseRatio: number | null;
            sharpeRatio: number | null;
            alpha: number | null;
            beta: number | null;
            stdDeviation: number | null;
            returns1y: number | null;
            returns3y: number | null;
            returns5y: number | null;
            returns10y: number | null;
            managerName: string | null;
            benchmarkIndex: string | null;
            navTrend: {
                date: Date;
                nav: number;
            }[];
        }[];
        bestPerformer1y: string | null;
        bestPerformer3y: string | null;
        lowestExpenseRatio: string | null;
        highestSharpeRatio: string | null;
    }>;
}
