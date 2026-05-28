import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../../common/prisma.service';
import { RedisService } from '../../common/redis.service';
import { FundsService } from '../../funds/funds.service';
import { AmfiNavRecord } from '../market-data.types';

@Injectable()
export class AmfiService {
  private readonly logger = new Logger(AmfiService.name);
  private readonly amfiUrl: string;
  private retryTimer?: NodeJS.Timeout;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly fundsService: FundsService,
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {
    this.amfiUrl =
      this.configService.get<string>('AMFI_NAV_URL') ||
      'https://www.amfiindia.com/spages/NAVAll.txt';
  }

  /**
   * Downloads and parses the AMFI all-schemes NAV text feed.
   */
  async fetchBulkNav(): Promise<AmfiNavRecord[]> {
    const response = await firstValueFrom(
      this.httpService.get<string>(this.amfiUrl, {
        responseType: 'text',
        timeout: 10000,
      }),
    );

    return this.parseAmfiText(response.data);
  }

  /**
   * Parses AMFI NAVAll.txt content into normalized NAV records.
   */
  parseAmfiText(raw: string): AmfiNavRecord[] {
    return raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => /^\d/.test(line))
      .map((line) => line.split(';').map((field) => field.trim()))
      .filter((fields) => fields.length >= 8)
      .map((fields) => {
        const nav = Number.parseFloat(fields[4]);
        const date = this.parseAmfiDate(fields[7]);

        if (!Number.isFinite(nav) || !date) return null;

        return {
          schemeCode: fields[0],
          name: fields[3],
          nav,
          date,
        };
      })
      .filter((record): record is AmfiNavRecord => Boolean(record));
  }

  /**
   * Runs the nightly AMFI bulk NAV sync and updates the last-sync cache marker.
   */
  @Cron(process.env.AMFI_SYNC_CRON || '30 23 * * *')
  async syncNightlyNavs(): Promise<void> {
    const startedAt = Date.now();

    try {
      this.logger.log('Starting AMFI bulk NAV sync');
      const records = await this.fetchBulkNav();
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
      this.logger.log(`AMFI sync completed for ${records.length} records`);
    } catch (error) {
      const message = error?.message || String(error);
      const timestamp = new Date().toISOString();
      console.error(`[${timestamp}] AMFI txt fetch failed: ${message}`);

      await this.prisma.syncLog.create({
        data: {
          source: 'AMFI',
          status: 'FAILED',
          fundsSync: 0,
          errors: [message],
          duration: Date.now() - startedAt,
        },
      });

      this.scheduleRetry();
    }
  }

  /**
   * Compatibility alias for older callers that expect AMFI fetch-and-sync semantics.
   */
  async fetchAndSyncNavs(): Promise<{
    totalProcessed: number;
    updated: number;
  }> {
    const records = await this.fetchBulkNav();
    await this.fundsService.upsertFundsFromAmfi(records);
    await this.redisService.set('amfi:last_sync', new Date().toISOString());
    return { totalProcessed: records.length, updated: records.length };
  }

  private parseAmfiDate(value: string): Date | null {
    if (!value) return null;

    const parsed = Date.parse(`${value} UTC`);
    if (!Number.isNaN(parsed)) {
      const date = new Date(parsed);
      return new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
      );
    }

    return null;
  }

  private scheduleRetry(): void {
    if (this.retryTimer) return;

    this.retryTimer = setTimeout(
      () => {
        this.retryTimer = undefined;
        void this.syncNightlyNavs();
      },
      30 * 60 * 1000,
    );
  }
}
