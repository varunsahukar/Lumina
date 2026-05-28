import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PrismaService } from '../common/prisma.service';
import { RedisService } from '../common/redis.service';
import { isRedisEnabled } from '../common/runtime-flags';
import { DATA_FRESHNESS_MAX_AGE_MS } from './market-data.types';

@Injectable()
export class MarketDataStartupService implements OnModuleInit {
  private readonly logger = new Logger(MarketDataStartupService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
    @InjectQueue('fund-sync') private readonly fundSyncQueue: Queue,
  ) {}

  /**
   * Checks DB/Redis connectivity and queues initial fund syncs when data is absent or stale.
   */
  async onModuleInit(): Promise<void> {
    await this.checkDatabase();
    if (!isRedisEnabled()) {
      this.logger.warn(
        `${new Date().toISOString()} Redis disabled; startup sync queue skipped`,
      );
      return;
    }

    await this.checkRedis();
    await this.queueStartupSyncIfNeeded();
  }

  private async checkDatabase(): Promise<void> {
    await this.prisma.$queryRaw`SELECT 1`;
    this.logger.log(`${new Date().toISOString()} database connection OK`);
  }

  private async checkRedis(): Promise<void> {
    await this.redisService.getClient().ping();
    this.logger.log(`${new Date().toISOString()} redis connection OK`);
  }

  private async queueStartupSyncIfNeeded(): Promise<void> {
    const [count, latestSync] = await Promise.all([
      this.prisma.fund.count(),
      this.prisma.fund.aggregate({ _max: { lastSyncedAt: true } }),
    ]);
    const lastSyncedAt = latestSync._max.lastSyncedAt;
    const isStale =
      !lastSyncedAt ||
      Date.now() - lastSyncedAt.getTime() > DATA_FRESHNESS_MAX_AGE_MS;

    if (count === 0) {
      await this.enqueueStartupJobs('fund table is empty');
      return;
    }

    if (isStale) {
      await this.enqueueStartupJobs(
        `last sync is older than ${DATA_FRESHNESS_MAX_AGE_MS / 3600000} hours`,
      );
      return;
    }

    this.logger.log(
      `${new Date().toISOString()} fund data is fresh; startup sync skipped`,
    );
  }

  private async enqueueStartupJobs(reason: string): Promise<void> {
    const options = {
      attempts: 3,
      backoff: { type: 'exponential' as const, delay: 5000 },
      removeOnComplete: 100,
      removeOnFail: 1000,
    };

    await Promise.all([
      this.fundSyncQueue.add('sync-india-funds', { reason }, options),
      this.fundSyncQueue.add('sync-usa-funds', { reason }, options),
    ]);

    this.logger.log(
      `${new Date().toISOString()} queued startup sync jobs: ${reason}`,
    );
  }
}
