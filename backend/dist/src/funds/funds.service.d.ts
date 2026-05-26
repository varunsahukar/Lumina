import { PrismaService } from '../common/prisma.service';
export declare class FundsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(params: {
        skip?: number;
        take?: number;
        category?: string;
        search?: string;
    }): Promise<{
        items: {
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
        }[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        navHistory: {
            id: string;
            createdAt: Date;
            nav: import("@prisma/client-runtime-utils").Decimal;
            fundId: string;
            date: Date;
        }[];
    } & {
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
    }>;
    getNavHistory(id: string, limit?: number): Promise<{
        id: string;
        createdAt: Date;
        nav: import("@prisma/client-runtime-utils").Decimal;
        fundId: string;
        date: Date;
    }[]>;
    getCategories(): Promise<string[]>;
}
