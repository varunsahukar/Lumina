import { Module } from '@nestjs/common';
import { BullModule, getQueueToken } from '@nestjs/bullmq';
import { FundsController } from './funds.controller';
import { FundsService } from './funds.service';
import { ScreenerService } from './screener.service';
import { ComparisonService } from './comparison.service';
import { isRedisEnabled } from '../common/runtime-flags';

const fundSyncQueueProvider = {
  provide: getQueueToken('fund-sync'),
  useValue: {
    add: async () => null,
  },
};

@Module({
  imports: [
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
  ],
  controllers: [FundsController],
  providers: [
    FundsService,
    ScreenerService,
    ComparisonService,
    ...(!isRedisEnabled() ? [fundSyncQueueProvider] : []),
  ],
  exports: [
    FundsService,
    ScreenerService,
    ComparisonService,
    ...(!isRedisEnabled() ? [fundSyncQueueProvider] : []),
  ],
})
export class FundsModule {}
