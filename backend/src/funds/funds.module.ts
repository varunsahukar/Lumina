import { Module } from '@nestjs/common';
import { FundsController } from './funds.controller';
import { FundsService } from './funds.service';
import { ScreenerService } from './screener.service';
import { ComparisonService } from './comparison.service';

@Module({
  controllers: [FundsController],
  providers: [FundsService, ScreenerService, ComparisonService],
  exports: [FundsService, ScreenerService, ComparisonService],
})
export class FundsModule {}
