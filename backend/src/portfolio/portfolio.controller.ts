import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { Response } from 'express';
import { PortfolioService } from './portfolio.service';
import { RebalanceService, TargetAllocation } from './rebalance.service';
import { ReportsService } from './reports.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('portfolio')
@UseGuards(JwtGuard)
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly rebalanceService: RebalanceService,
    private readonly reportsService: ReportsService,
  ) {}

  @Get()
  async getPortfolios(@Req() req: any) {
    return this.portfolioService.getPortfolios(req.user.id);
  }

  @Post()
  async createPortfolio(@Req() req: any, @Body('name') name: string) {
    return this.portfolioService.createPortfolio(req.user.id, name);
  }

  @Get(':id/valuation')
  async getValuation(@Param('id') id: string) {
    return this.portfolioService.getPortfolioValuation(id);
  }

  @Post(':id/rebalance')
  async getRebalanceSuggestions(
    @Param('id') id: string,
    @Body('targets') targets: TargetAllocation[],
  ) {
    return this.rebalanceService.calculateRebalanceSuggestions(id, targets);
  }

  @Get(':id/report/pdf')
  async downloadPdf(@Param('id') id: string, @Res() res: Response) {
    const buffer = await this.reportsService.generatePdfReport(id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=portfolio-${id}-statement.pdf`,
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }

  @Get(':id/report/excel')
  async downloadExcel(@Param('id') id: string, @Res() res: Response) {
    const buffer = await this.reportsService.generateExcelReport(id);
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename=portfolio-${id}-statement.xlsx`,
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
}
