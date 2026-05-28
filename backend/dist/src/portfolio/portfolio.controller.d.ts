import type { Response } from 'express';
import { PortfolioService } from './portfolio.service';
import { RebalanceService, TargetAllocation } from './rebalance.service';
import { ReportsService } from './reports.service';
export declare class PortfolioController {
    private readonly portfolioService;
    private readonly rebalanceService;
    private readonly reportsService;
    constructor(portfolioService: PortfolioService, rebalanceService: RebalanceService, reportsService: ReportsService);
    getPortfolios(req: any): Promise<({
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
    createPortfolio(req: any, name: string): Promise<{
        userId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getValuation(id: string): Promise<{
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
    getRebalanceSuggestions(id: string, targets: TargetAllocation[]): Promise<{
        portfolioId: string;
        totalCurrentValue: number;
        suggestions: any[];
    }>;
    downloadPdf(id: string, res: Response): Promise<void>;
    downloadExcel(id: string, res: Response): Promise<void>;
}
