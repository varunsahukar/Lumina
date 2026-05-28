import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ComparisonService {
  constructor(private prisma: PrismaService) {}

  /**
   * Builds a side-by-side comparison for up to five active funds.
   */
  async compareFunds(fundIds: string[]) {
    if (!fundIds || fundIds.length === 0) {
      throw new BadRequestException(
        'At least one fund ID must be specified for comparison',
      );
    }
    if (fundIds.length > 5) {
      throw new BadRequestException(
        'Cannot compare more than 5 funds at a time',
      );
    }

    const funds = await this.prisma.fund.findMany({
      where: {
        id: { in: fundIds },
        isActive: true,
      },
      include: {
        history: {
          orderBy: { date: 'desc' },
          take: 12, // Last 12 points for trend comparison
        },
      },
    });

    if (funds.length === 0) {
      throw new BadRequestException(
        'None of the specified funds could be found',
      );
    }

    // Format side-by-side comparison matrix
    return {
      comparedFunds: funds.map((fund) => ({
        id: fund.id,
        schemeName: fund.name,
        name: fund.name,
        schemeCode: fund.schemeCode,
        amcName: fund.amcName,
        category: fund.category,
        subCategory: fund.subCategory,
        nav: fund.nav,
        aum: fund.aum,
        expenseRatio: fund.expenseRatio,
        sharpeRatio: fund.sharpeRatio,
        alpha: fund.alpha,
        beta: fund.beta,
        stdDeviation: fund.stdDeviation,
        returns1y: fund.returns1y,
        returns3y: fund.returns3y,
        returns5y: fund.returns5y,
        returns10y: fund.returns10y,
        managerName: fund.managerName,
        benchmarkIndex: fund.benchmarkIndex,
        navTrend: fund.history.reverse().map((h) => ({
          date: h.date,
          nav: h.nav,
        })),
      })),
      // Summary analytics comparing returns and risk
      bestPerformer1y:
        [...funds].sort(
          (a, b) => Number(b.returns1y || 0) - Number(a.returns1y || 0),
        )[0]?.name || null,
      bestPerformer3y:
        [...funds].sort(
          (a, b) => Number(b.returns3y || 0) - Number(a.returns3y || 0),
        )[0]?.name || null,
      lowestExpenseRatio:
        [...funds].sort(
          (a, b) => Number(a.expenseRatio || 99) - Number(b.expenseRatio || 99),
        )[0]?.name || null,
      highestSharpeRatio:
        [...funds].sort(
          (a, b) => Number(b.sharpeRatio || -99) - Number(a.sharpeRatio || -99),
        )[0]?.name || null,
    };
  }
}
