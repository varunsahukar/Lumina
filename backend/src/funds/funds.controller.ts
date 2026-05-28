import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { UserRole } from '../generated/prisma';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ComparisonService } from './comparison.service';
import { FundsService } from './funds.service';
import { ScreenerFilterDto, ScreenerService } from './screener.service';

@Controller('funds')
export class FundsController {
  constructor(
    private readonly fundsService: FundsService,
    private readonly screenerService: ScreenerService,
    private readonly comparisonService: ComparisonService,
  ) {}

  /**
   * Handles GET /api/funds with market, search, sort, direction, and pagination filters.
   */
  @Get()
  async getAllFunds(
    @Res({ passthrough: true }) response: Response,
    @Query('market') market?: string,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('dir') dir?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    await this.setFreshnessHeader(response);
    return this.fundsService.getAllFunds({
      market,
      search,
      sort,
      dir,
      page,
      limit,
    });
  }

  /**
   * Handles GET /api/funds/stats/summary.
   */
  @Get('stats/summary')
  async getSummaryStats(@Res({ passthrough: true }) response: Response) {
    await this.setFreshnessHeader(response);
    return this.fundsService.getSummaryStats();
  }

  /**
   * Handles POST /api/funds/refresh by enqueueing manual sync jobs for admins.
   */
  @Post('refresh')
  @HttpCode(202)
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async triggerManualRefresh() {
    return this.fundsService.triggerManualRefresh();
  }

  /**
   * Returns distinct fund categories for older screener clients.
   */
  @Get('categories')
  async getCategories() {
    return this.fundsService.getCategories();
  }

  /**
   * Compares multiple funds for older comparison clients.
   */
  @Get('compare')
  async compare(@Query('ids') idsString: string) {
    const ids = idsString ? idsString.split(',') : [];
    return this.comparisonService.compareFunds(ids);
  }

  /**
   * Screens funds using richer legacy filter controls.
   */
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

  /**
   * Handles GET /api/funds/:id by id or scheme code.
   */
  @Get(':id')
  async getFundById(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string,
  ) {
    await this.setFreshnessHeader(response);
    return this.fundsService.getFundById(id);
  }

  /**
   * Handles GET /api/funds/:id/history with a days query parameter.
   */
  @Get(':id/history')
  async getFundHistory(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string,
    @Query('days') days?: string,
  ) {
    await this.setFreshnessHeader(response);
    return this.fundsService.getFundHistory(id, Number(days) || 30);
  }

  private async setFreshnessHeader(response: Response): Promise<void> {
    const freshness = await this.fundsService.getDataFreshness();
    if (freshness === 'stale') {
      response.setHeader('X-Data-Freshness', 'stale');
    }
  }
}
