import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

interface CashFlow {
  amount: number;
  date: Date;
}

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async createPortfolio(userId: string, name: string) {
    return this.prisma.portfolio.create({
      data: {
        userId,
        name,
      },
    });
  }

  async getPortfolios(userId: string) {
    return this.prisma.portfolio.findMany({
      where: { userId },
      include: {
        holdings: {
          include: {
            fund: true,
          },
        },
      },
    });
  }

  async getPortfolioValuation(portfolioId: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id: portfolioId },
      include: {
        holdings: {
          include: {
            fund: true,
          },
        },
      },
    });

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${portfolioId} not found`);
    }

    let totalInvested = 0;
    let totalCurrentValue = 0;

    const holdingsValuation = portfolio.holdings.map((holding) => {
      const invested = Number(holding.investedAmount);
      const units = Number(holding.units);
      const currentNav = Number(holding.fund.nav);
      const currentValue = units * currentNav;
      const profitLoss = currentValue - invested;
      const returnsPct = invested > 0 ? (profitLoss / invested) * 100 : 0;

      totalInvested += invested;
      totalCurrentValue += currentValue;

      return {
        holdingId: holding.id,
        fundId: holding.fundId,
        schemeName: holding.fund.schemeName,
        units,
        avgNav: Number(holding.avgNav),
        currentNav,
        investedAmount: invested,
        currentValue,
        profitLoss,
        returnsPct,
      };
    });

    const totalProfitLoss = totalCurrentValue - totalInvested;
    const absoluteReturnPct =
      totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

    // Calculate XIRR
    const xirr = await this.calculatePortfolioXirr(
      portfolioId,
      totalCurrentValue,
    );

    return {
      portfolioId,
      portfolioName: portfolio.name,
      totalInvested,
      totalCurrentValue,
      totalProfitLoss,
      absoluteReturnPct,
      xirrPct: xirr * 100,
      holdings: holdingsValuation,
    };
  }

  // Math helper to calculate XIRR for a portfolio
  private async calculatePortfolioXirr(
    portfolioId: string,
    currentValue: number,
  ): Promise<number> {
    // Get all completed buy/sell transactions for this portfolio's funds
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id: portfolioId },
      include: { holdings: true },
    });

    if (!portfolio) return 0;

    const fundIds = portfolio.holdings.map((h) => h.fundId);
    if (fundIds.length === 0) return 0;

    // Retrieve cash flows: buys (negative), sells (positive)
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId: portfolio.userId,
        fundId: { in: fundIds },
        status: 'COMPLETED',
      },
      orderBy: { date: 'asc' },
    });

    const cashFlows: CashFlow[] = transactions.map((tx) => ({
      // Investment is negative cash flow (money outflow)
      amount:
        tx.type === 'BUY' || tx.type === 'SIP'
          ? -Number(tx.amount)
          : Number(tx.amount),
      date: new Date(tx.date),
    }));

    if (cashFlows.length === 0) return 0;

    // Add current valuation as a positive cash flow at today's date (money inflow if sold today)
    cashFlows.push({
      amount: currentValue,
      date: new Date(),
    });

    return this.solveXirr(cashFlows);
  }

  // Newton-Raphson XIRR solver
  private solveXirr(cashFlows: CashFlow[]): number {
    if (cashFlows.length < 2) return 0;

    // Ensure we have at least one negative and one positive cash flow
    const hasNegative = cashFlows.some((cf) => cf.amount < 0);
    const hasPositive = cashFlows.some((cf) => cf.amount > 0);
    if (!hasNegative || !hasPositive) return 0;

    const maxIterations = 100;
    const precision = 1e-6;
    let rate = 0.1; // initial guess (10% return)

    const d1 = cashFlows[0].date.getTime();

    for (let i = 0; i < maxIterations; i++) {
      let fValue = 0;
      let fDerivative = 0;

      for (const cf of cashFlows) {
        const t = (cf.date.getTime() - d1) / (365 * 24 * 60 * 60 * 1000);
        const exp = Math.pow(1 + rate, t);
        fValue += cf.amount / exp;
        fDerivative += (-t * cf.amount) / (exp * (1 + rate));
      }

      if (Math.abs(fDerivative) < 1e-12) break;

      const nextRate = rate - fValue / fDerivative;
      if (Math.abs(nextRate - rate) < precision) {
        return nextRate;
      }
      rate = nextRate;
    }

    return rate;
  }
}
