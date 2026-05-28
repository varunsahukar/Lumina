import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

export interface ScreenerFilterDto {
  category?: string;
  minAum?: number;
  maxExpenseRatio?: number;
  minSharpe?: number;
  minReturns1y?: number;
  minReturns3y?: number;
  minReturns5y?: number;
  sortBy?:
    | 'aum'
    | 'sharpeRatio'
    | 'returns1y'
    | 'returns3y'
    | 'returns5y'
    | 'expenseRatio';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}

@Injectable()
export class ScreenerService {
  constructor(private prisma: PrismaService) {}

  /**
   * Screens funds using category, performance, risk, and sorting filters.
   */
  async screenFunds(filters: ScreenerFilterDto) {
    const {
      category,
      minAum,
      maxExpenseRatio,
      minSharpe,
      minReturns1y,
      minReturns3y,
      minReturns5y,
      sortBy = 'returns3y',
      sortOrder = 'desc',
      limit = 50,
    } = filters;

    const where: any = { isActive: true };

    if (category) {
      where.category = { equals: category, mode: 'insensitive' };
    }
    if (minAum !== undefined) {
      where.aum = { gte: minAum };
    }
    if (maxExpenseRatio !== undefined) {
      where.expenseRatio = { lte: maxExpenseRatio };
    }
    if (minSharpe !== undefined) {
      where.sharpeRatio = { gte: minSharpe };
    }
    if (minReturns1y !== undefined) {
      where.returns1y = { gte: minReturns1y };
    }
    if (minReturns3y !== undefined) {
      where.returns3y = { gte: minReturns3y };
    }
    if (minReturns5y !== undefined) {
      where.returns5y = { gte: minReturns5y };
    }

    return this.prisma.fund.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      take: Number(limit),
    });
  }
}
