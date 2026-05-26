import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class FundsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    category?: string;
    search?: string;
  }) {
    const { skip, take, category, search } = params;

    const where: any = { isActive: true };
    if (category) {
      where.category = { equals: category, mode: 'insensitive' };
    }
    if (search) {
      where.OR = [
        { schemeName: { contains: search, mode: 'insensitive' } },
        { amcName: { contains: search, mode: 'insensitive' } },
        { schemeCode: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.fund.findMany({
        where,
        skip: skip ? Number(skip) : undefined,
        take: take ? Number(take) : undefined,
        orderBy: { schemeName: 'asc' },
      }),
      this.prisma.fund.count({ where }),
    ]);

    return { items, total };
  }

  async findOne(id: string) {
    const fund = await this.prisma.fund.findUnique({
      where: { id },
      include: {
        navHistory: {
          orderBy: { date: 'desc' },
          take: 30, // Default to last 30 entries
        },
      },
    });

    if (!fund) {
      throw new NotFoundException(`Fund with ID ${id} not found`);
    }

    return fund;
  }

  async getNavHistory(id: string, limit = 365) {
    const fund = await this.prisma.fund.findUnique({ where: { id } });
    if (!fund) throw new NotFoundException(`Fund with ID ${id} not found`);

    return this.prisma.navHistory.findMany({
      where: { fundId: id },
      orderBy: { date: 'asc' },
      take: Number(limit),
    });
  }

  async getCategories() {
    const categories = await this.prisma.fund.findMany({
      select: { category: true },
      distinct: ['category'],
    });
    return categories.map((c) => c.category);
  }
}
