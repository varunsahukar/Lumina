import { Injectable, NotFoundException } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PrismaService } from '../common/prisma.service';

export interface TargetAllocation {
  fundId: string;
  targetWeightPct: number; // e.g. 50 for 50%
}

@Injectable()
export class RebalanceService {
  constructor(
    private portfolioService: PortfolioService,
    private prisma: PrismaService,
  ) {}

  /**
   * Calculates rebalance buy/sell suggestions against target allocations.
   */
  async calculateRebalanceSuggestions(
    portfolioId: string,
    targets: TargetAllocation[],
  ) {
    const totalTarget = targets.reduce((sum, t) => sum + t.targetWeightPct, 0);
    if (Math.abs(totalTarget - 100) > 0.01) {
      throw new Error(
        'Target allocation percentages must sum up to exactly 100%',
      );
    }

    const valuation =
      await this.portfolioService.getPortfolioValuation(portfolioId);
    const { totalCurrentValue } = valuation;

    if (totalCurrentValue === 0) {
      throw new NotFoundException(
        'Cannot rebalance an empty portfolio. Please purchase assets first.',
      );
    }

    const suggestions: any[] = [];

    for (const target of targets) {
      const targetWeight = target.targetWeightPct / 100;
      const targetValue = totalCurrentValue * targetWeight;

      // Find current holding for this fund
      const currentHolding = valuation.holdings.find(
        (h) => h.fundId === target.fundId,
      );
      const currentValue = currentHolding ? currentHolding.currentValue : 0;
      const schemeName = currentHolding
        ? currentHolding.schemeName
        : (await this.prisma.fund.findUnique({ where: { id: target.fundId } }))
            ?.name || 'Unknown Fund';

      const difference = targetValue - currentValue; // Positive means Buy, Negative means Sell
      const currentWeightPct = (currentValue / totalCurrentValue) * 100;

      suggestions.push({
        fundId: target.fundId,
        schemeName,
        currentWeightPct,
        targetWeightPct: target.targetWeightPct,
        currentValue,
        targetValue,
        action: difference > 0 ? 'BUY' : difference < 0 ? 'SELL' : 'HOLD',
        amount: Math.abs(difference),
        units:
          currentHolding && currentHolding.currentNav > 0
            ? Math.abs(difference) / currentHolding.currentNav
            : 0,
      });
    }

    return {
      portfolioId,
      totalCurrentValue,
      suggestions,
    };
  }
}
