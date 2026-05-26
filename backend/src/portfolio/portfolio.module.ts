import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { RebalanceService } from './rebalance.service';
import { ReportsService } from './reports.service';

@Module({
  controllers: [PortfolioController],
  providers: [PortfolioService, RebalanceService, ReportsService],
  exports: [PortfolioService, RebalanceService, ReportsService],
})
export class PortfolioModule {}
