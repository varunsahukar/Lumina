import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bullmq';
import { PrismaService } from '../common/prisma.service';
import { RedisService } from '../common/redis.service';
import { FundsService } from '../funds/funds.service';
import { AmfiService } from './india/amfi.service';
import { MfApiService } from './india/mfapi.service';
import {
  DEFAULT_INDIA_SCHEME_CODES,
  DEFAULT_USA_TICKERS,
} from './market-data.types';
import {
  AlphaVantageService,
  ConfigException,
} from './usa/alpha-vantage.service';

type SyncJobName = 'sync-india-funds' | 'sync-usa-funds' | 'sync-amfi-bulk';

@Injectable()
@Processor('fund-sync')
export class FundSyncProcessor extends WorkerHost {
  private readonly logger = new Logger(FundSyncProcessor.name);

  constructor(
    private readonly mfApiService: MfApiService,
    private readonly amfiService: AmfiService,
    private readonly alphaVantageService: AlphaVantageService,
    private readonly fundsService: FundsService,
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  /**
   * Dispatches BullMQ fund-sync jobs to the correct market data sync path.
   */
  async process(job: Job<unknown, unknown, SyncJobName>): Promise<unknown> {
    this.logger.log(`Processing ${job.name} job ${job.id}`);

    switch (job.name) {
      case 'sync-india-funds':
        return this.syncIndiaFunds(job);
      case 'sync-usa-funds':
        return this.syncUsaFunds(job);
      case 'sync-amfi-bulk':
        return this.syncAmfiBulk();
      default:
        throw new Error(`Unsupported fund sync job: ${job.name}`);
    }
  }

  private async syncIndiaFunds(job: Job): Promise<{
    status: 'SUCCESS' | 'PARTIAL';
    fundsSync: number;
  }> {
    const startedAt = Date.now();
    const codes = this.resolveIndiaSchemeCodes(job.data);
    const data = await this.mfApiService.bulkFetchFunds(codes);
    const errors = this.mfApiService.getLastBulkErrors();

    if (data.length > 0) {
      await this.fundsService.upsertFundsFromMfApi(data);
    }

    const status =
      errors.length || data.length < codes.length ? 'PARTIAL' : 'SUCCESS';
    await this.prisma.syncLog.create({
      data: {
        source: 'MFAPI',
        status,
        fundsSync: data.length,
        errors,
        duration: Date.now() - startedAt,
      },
    });

    if (status === 'PARTIAL') {
      this.logger.warn(
        `mfapi.in sync completed partially (${data.length}/${codes.length}); stale DB values remain available`,
      );
    }

    return { status, fundsSync: data.length };
  }

  private async syncUsaFunds(job: Job): Promise<{
    status: 'SUCCESS' | 'PARTIAL';
    fundsSync: number;
  }> {
    const startedAt = Date.now();

    try {
      const quotes = await this.alphaVantageService.fetchAllQuotes();
      await this.fundsService.upsertUsaFunds(quotes);

      const errors = this.alphaVantageService.getLastFetchErrors();
      const requestedTickers = this.resolveUsaTickers(job.data);
      const status =
        errors.length || quotes.length < requestedTickers.length
          ? 'PARTIAL'
          : 'SUCCESS';

      await this.prisma.syncLog.create({
        data: {
          source: 'ALPHA_VANTAGE',
          status,
          fundsSync: quotes.length,
          errors,
          duration: Date.now() - startedAt,
        },
      });

      return { status, fundsSync: quotes.length };
    } catch (error) {
      await this.prisma.syncLog.create({
        data: {
          source: 'ALPHA_VANTAGE',
          status: 'FAILED',
          fundsSync: 0,
          errors: [error?.message || String(error)],
          duration: Date.now() - startedAt,
        },
      });

      if (error instanceof ConfigException) {
        this.logger.error(error.message);
      }

      throw error;
    }
  }

  private async syncAmfiBulk(): Promise<{
    status: 'SUCCESS';
    fundsSync: number;
  }> {
    const startedAt = Date.now();

    try {
      const records = await this.amfiService.fetchBulkNav();
      await this.fundsService.upsertFundsFromAmfi(records);
      await this.redisService.set('amfi:last_sync', new Date().toISOString());
      await this.prisma.syncLog.create({
        data: {
          source: 'AMFI',
          status: 'SUCCESS',
          fundsSync: records.length,
          errors: [],
          duration: Date.now() - startedAt,
        },
      });

      return { status: 'SUCCESS', fundsSync: records.length };
    } catch (error) {
      const message = error?.message || String(error);
      const timestamp = new Date().toISOString();
      console.error(`[${timestamp}] AMFI bulk sync job failed: ${message}`);

      await this.prisma.syncLog.create({
        data: {
          source: 'AMFI',
          status: 'FAILED',
          fundsSync: 0,
          errors: [message],
          duration: Date.now() - startedAt,
        },
      });

      throw error;
    }
  }

  private resolveIndiaSchemeCodes(data: unknown): string[] {
    const fromJob = this.getStringArray(data, 'codes');
    const configured = this.configService.get<string>('INDIA_SCHEME_CODES');
    const codes =
      fromJob.length > 0
        ? fromJob
        : configured
          ? configured.split(',')
          : DEFAULT_INDIA_SCHEME_CODES;

    return [...new Set(codes.map((code) => code.trim()).filter(Boolean))];
  }

  private resolveUsaTickers(data: unknown): string[] {
    const fromJob = this.getStringArray(data, 'tickers');
    const configured = this.configService.get<string>('USA_TICKERS');
    const tickers =
      fromJob.length > 0
        ? fromJob
        : configured
          ? configured.split(',')
          : DEFAULT_USA_TICKERS;

    return [...new Set(tickers.map((ticker) => ticker.trim()).filter(Boolean))];
  }

  private getStringArray(data: unknown, key: string): string[] {
    if (!data || typeof data !== 'object') return [];
    const value = (data as Record<string, unknown>)[key];
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === 'string')
      : [];
  }
}
