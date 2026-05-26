import { PortfolioService } from './portfolio.service';
import { PrismaService } from '../common/prisma.service';
export interface TargetAllocation {
    fundId: string;
    targetWeightPct: number;
}
export declare class RebalanceService {
    private portfolioService;
    private prisma;
    constructor(portfolioService: PortfolioService, prisma: PrismaService);
    calculateRebalanceSuggestions(portfolioId: string, targets: TargetAllocation[]): Promise<{
        portfolioId: string;
        totalCurrentValue: number;
        suggestions: any[];
    }>;
}
