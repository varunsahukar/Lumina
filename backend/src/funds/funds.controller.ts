import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { FundsService } from './funds.service';
import { ScreenerService, ScreenerFilterDto } from './screener.service';
import { ComparisonService } from './comparison.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('funds')
@UseGuards(JwtGuard)
export class FundsController {
  constructor(
    private readonly fundsService: FundsService,
    private readonly screenerService: ScreenerService,
    private readonly comparisonService: ComparisonService,
  ) {}

  @Get()
  async getFunds(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    return this.fundsService.findAll({ skip, take, category, search });
  }

  @Get('categories')
  async getCategories() {
    return this.fundsService.getCategories();
  }

  @Get('compare')
  async compare(@Query('ids') idsString: string) {
    const ids = idsString ? idsString.split(',') : [];
    return this.comparisonService.compareFunds(ids);
  }

  @Get('screen')
  async screen(
    @Query('category') category?: string,
    @Query('minAum') minAum?: number,
    @Query('maxExpenseRatio') maxExpenseRatio?: number,
    @Query('minSharpe') minSharpe?: number,
    @Query('minReturns1y') minReturns1y?: number,
    @Query('minReturns3y') minReturns3y?: number,
    @Query('minReturns5y') minReturns5y?: number,
    @Query('sortBy')
    sortBy?:
      | 'aum'
      | 'sharpeRatio'
      | 'returns1y'
      | 'returns3y'
      | 'returns5y'
      | 'expenseRatio',
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('limit') limit?: number,
  ) {
    const filters: ScreenerFilterDto = {
      category,
      minAum: minAum ? Number(minAum) : undefined,
      maxExpenseRatio: maxExpenseRatio ? Number(maxExpenseRatio) : undefined,
      minSharpe: minSharpe ? Number(minSharpe) : undefined,
      minReturns1y: minReturns1y ? Number(minReturns1y) : undefined,
      minReturns3y: minReturns3y ? Number(minReturns3y) : undefined,
      minReturns5y: minReturns5y ? Number(minReturns5y) : undefined,
      sortBy,
      sortOrder,
      limit: limit ? Number(limit) : undefined,
    };
    return this.screenerService.screenFunds(filters);
  }

  @Get(':id')
  async getFund(@Param('id') id: string) {
    return this.fundsService.findOne(id);
  }

  @Get(':id/history')
  async getNavHistory(@Param('id') id: string, @Query('limit') limit?: number) {
    return this.fundsService.getNavHistory(id, limit);
  }
}
