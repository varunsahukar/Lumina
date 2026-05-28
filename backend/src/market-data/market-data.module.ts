import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { getQueueToken } from '@nestjs/bullmq';
import { isRedisEnabled } from '../common/runtime-flags';
import { FundsModule } from '../funds/funds.module';
import { BseService } from './india/bse.service';
import { AmfiService } from './india/amfi.service';
import { MfApiService } from './india/mfapi.service';
import { NseService } from './india/nse.service';
import { YahooFinanceService } from './international/yahoo-finance.service';
import { MarketDataStartupService } from './startup-sync.service';
import { FundSyncProcessor } from './sync.processor';
import { AlphaVantageService } from './usa/alpha-vantage.service';
import { FinnhubService } from './usa/finnhub.service';
import { SecEdgarService } from './usa/sec-edgar.service';

const fundSyncQueueProvider = {
  provide: getQueueToken('fund-sync'),
  useValue: {
    add: async () => null,
  },
};

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
    }),
    ...(isRedisEnabled()
      ? [
          BullModule.registerQueue({
            name: 'fund-sync',
            defaultJobOptions: {
              attempts: 3,
              backoff: {
                type: 'exponential',
                delay: 5000,
              },
              removeOnComplete: 100,
              removeOnFail: 1000,
            },
          }),
        ]
      : []),
    ScheduleModule.forRoot(),
    FundsModule,
  ],
  providers: [
    AmfiService,
    MfApiService,
    NseService,
    BseService,
    FinnhubService,
    AlphaVantageService,
    SecEdgarService,
    YahooFinanceService,
    MarketDataStartupService,
    ...(isRedisEnabled() ? [FundSyncProcessor] : [fundSyncQueueProvider]),
  ],
  exports: [
    AmfiService,
    MfApiService,
    AlphaVantageService,
    NseService,
    BseService,
    FinnhubService,
    SecEdgarService,
    YahooFinanceService,
  ],
})
export class MarketDataModule {}
