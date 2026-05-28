import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import pLimit from 'p-limit';
import { firstValueFrom } from 'rxjs';
import { FundData, FundMeta, NavPoint } from '../market-data.types';

interface MfApiScheme {
  schemeCode: number | string;
  schemeName: string;
}

interface MfApiNavRow {
  date: string;
  nav: string;
}

interface MfApiFundResponse {
  meta: {
    fund_house?: string;
    scheme_type?: string;
    scheme_category?: string;
    scheme_code?: number | string;
    scheme_name?: string;
  };
  data: MfApiNavRow[];
}

@Injectable()
export class MfApiService {
  private readonly logger = new Logger(MfApiService.name);
  private readonly baseUrl: string;
  private lastBulkErrors: string[] = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>('MFAPI_BASE_URL') ||
      'https://api.mfapi.in/mf';
  }

  /**
   * Fetches metadata for one Indian mutual fund scheme from mfapi.in.
   */
  async fetchFundMeta(schemeCode: string): Promise<FundMeta> {
    const fund = await this.fetchFundData(schemeCode);
    return fund.meta;
  }

  /**
   * Fetches the latest NAV history points for one Indian mutual fund scheme.
   */
  async fetchFundHistory(
    schemeCode: string,
    days: number,
  ): Promise<NavPoint[]> {
    const fund = await this.fetchFundData(schemeCode);
    return fund.history.slice(0, Math.max(1, Number(days) || 30));
  }

  /**
   * Fetches the complete scheme code catalog published by mfapi.in.
   */
  async fetchAllSchemeCodes(): Promise<
    { schemeCode: string; schemeName: string }[]
  > {
    const response = await firstValueFrom(
      this.httpService.get<MfApiScheme[]>(this.baseUrl, { timeout: 10000 }),
    );

    return response.data
      .filter((scheme) => scheme.schemeCode && scheme.schemeName)
      .map((scheme) => ({
        schemeCode: String(scheme.schemeCode),
        schemeName: scheme.schemeName,
      }));
  }

  /**
   * Fetches fund metadata and NAV histories for multiple scheme codes with bounded concurrency.
   */
  async bulkFetchFunds(codes: string[]): Promise<FundData[]> {
    this.lastBulkErrors = [];

    const concurrency =
      Number(this.configService.get<string>('INDIA_SYNC_CONCURRENCY')) || 5;
    const limit = pLimit(Math.max(1, concurrency));
    const uniqueCodes = [...new Set(codes.map((code) => code.trim()))].filter(
      Boolean,
    );

    const settled = await Promise.allSettled(
      uniqueCodes.map((code) =>
        limit(async () => this.fetchFundDataWithRetry(code)),
      ),
    );

    const funds: FundData[] = [];
    settled.forEach((result, index) => {
      const schemeCode = uniqueCodes[index];
      if (result.status === 'fulfilled') {
        funds.push(result.value);
        return;
      }

      const message = `${schemeCode}: ${result.reason?.message || result.reason}`;
      this.lastBulkErrors.push(message);
      this.logger.warn(`mfapi.in sync skipped ${message}`);
    });

    return funds;
  }

  /**
   * Returns the most recent per-code errors from bulkFetchFunds.
   */
  getLastBulkErrors(): string[] {
    return [...this.lastBulkErrors];
  }

  private async fetchFundDataWithRetry(schemeCode: string): Promise<FundData> {
    try {
      return await this.fetchFundData(schemeCode);
    } catch (error) {
      this.logger.warn(
        `mfapi.in request failed for ${schemeCode}; retrying once in 1s`,
      );
      await this.sleep(1000);
      return this.fetchFundData(schemeCode);
    }
  }

  private async fetchFundData(schemeCode: string): Promise<FundData> {
    const response = await firstValueFrom(
      this.httpService.get<MfApiFundResponse>(
        `${this.baseUrl}/${encodeURIComponent(schemeCode)}`,
        { timeout: 10000 },
      ),
    );

    const payload = response.data;
    if (!payload?.meta || !Array.isArray(payload.data)) {
      throw new Error('Unexpected mfapi.in response shape');
    }

    const history = payload.data
      .map((row) => this.toNavPoint(row))
      .filter((point): point is NavPoint => Boolean(point));

    if (history.length === 0) {
      throw new Error('No numeric NAV history returned');
    }

    const latestNav = history[0]?.nav;
    const previousNav = history[1]?.nav;
    const changePercent =
      latestNav !== undefined && previousNav
        ? ((latestNav - previousNav) / previousNav) * 100
        : undefined;

    return {
      meta: {
        fundHouse: payload.meta.fund_house || '',
        schemeType: payload.meta.scheme_type || '',
        schemeCategory: payload.meta.scheme_category || 'Equity',
        schemeCode: String(payload.meta.scheme_code || schemeCode),
        schemeName: payload.meta.scheme_name || schemeCode,
      },
      history,
      latestNav,
      previousNav,
      changePercent,
    };
  }

  private toNavPoint(row: MfApiNavRow): NavPoint | null {
    const nav = Number.parseFloat(row.nav);
    if (!Number.isFinite(nav)) return null;

    const date = this.parseMfApiDate(row.date);
    if (!date) return null;

    return { date, nav };
  }

  private parseMfApiDate(value: string): Date | null {
    const [day, month, year] = value.split('-').map(Number);
    if (!day || !month || !year) return null;

    return new Date(Date.UTC(year, month - 1, day));
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
