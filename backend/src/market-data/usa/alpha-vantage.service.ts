import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../../common/prisma.service';
import { RedisService } from '../../common/redis.service';
import { FundsService } from '../../funds/funds.service';
import {
  DEFAULT_USA_TICKERS,
  USA_FUND_NAMES,
  UsaFundQuote,
} from '../market-data.types';

interface AlphaVantageGlobalQuote {
  '01. symbol'?: string;
  '05. price'?: string;
  '07. latest trading day'?: string;
  '09. change'?: string;
  '10. change percent'?: string;
}

interface AlphaVantageResponse {
  'Global Quote'?: AlphaVantageGlobalQuote;
  Note?: string;
  Information?: string;
  [key: string]: unknown;
}

export class ConfigException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigException';
  }
}

@Injectable()
export class AlphaVantageService {
  private readonly logger = new Logger(AlphaVantageService.name);
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private lastFetchErrors: string[] = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly fundsService: FundsService,
    private readonly prisma: PrismaService,
  ) {
    this.apiKey =
      this.configService.get<string>('ALPHA_VANTAGE_KEY') ||
      this.configService.get<string>('ALPHA_VANTAGE_API_KEY') ||
      '';
    this.baseUrl =
      this.configService.get<string>('ALPHA_VANTAGE_BASE_URL') ||
      'https://www.alphavantage.co/query';
  }

  /**
   * Fetches the current global quote for one USA mutual fund symbol.
   */
  async fetchQuote(symbol: string): Promise<UsaFundQuote> {
    return this.fetchQuoteWithRetry(symbol.toUpperCase().trim(), true);
  }

  /**
   * Fetches all configured USA mutual fund quotes while respecting Alpha Vantage rate limits.
   */
  async fetchAllQuotes(): Promise<UsaFundQuote[]> {
    this.lastFetchErrors = [];

    const tickers = this.getUsaTickers();
    const intervalMs =
      Number(this.configService.get<string>('USA_SYNC_INTERVAL_MS')) || 12000;
    const quotes: UsaFundQuote[] = [];

    for (let index = 0; index < tickers.length; index++) {
      if (index > 0) {
        await this.sleep(intervalMs);
      }

      const symbol = tickers[index];
      try {
        quotes.push(await this.fetchQuote(symbol));
      } catch (error) {
        if (error instanceof ConfigException) {
          throw error;
        }

        const message = `${symbol}: ${this.getErrorMessage(error)}`;
        this.lastFetchErrors.push(message);
        this.logger.warn(`Alpha Vantage quote skipped ${message}`);
      }
    }

    return quotes;
  }

  /**
   * Runs the scheduled USA mutual fund sync every four hours.
   */
  @Cron(process.env.USA_SYNC_CRON || '0 */4 * * *')
  async syncUsaFunds(): Promise<void> {
    const startedAt = Date.now();

    try {
      const quotes = await this.fetchAllQuotes();
      await this.fundsService.upsertUsaFunds(quotes);
      await this.prisma.syncLog.create({
        data: {
          source: 'ALPHA_VANTAGE',
          status: this.lastFetchErrors.length ? 'PARTIAL' : 'SUCCESS',
          fundsSync: quotes.length,
          errors: this.lastFetchErrors,
          duration: Date.now() - startedAt,
        },
      });
      this.logger.log(`USA fund sync completed for ${quotes.length} quotes`);
    } catch (error) {
      const message = this.getErrorMessage(error);
      this.logger.error(`Alpha Vantage sync stopped: ${message}`);
      await this.prisma.syncLog.create({
        data: {
          source: 'ALPHA_VANTAGE',
          status: 'FAILED',
          fundsSync: 0,
          errors: [message],
          duration: Date.now() - startedAt,
        },
      });
    }
  }

  /**
   * Returns the most recent per-symbol errors from fetchAllQuotes.
   */
  getLastFetchErrors(): string[] {
    return [...this.lastFetchErrors];
  }

  /**
   * Fetches a foreign-exchange rate from Alpha Vantage, preserving the older market-data API.
   */
  async getExchangeRate(fromCurrency: string, toCurrency: string) {
    const from = fromCurrency.toUpperCase().trim();
    const to = toCurrency.toUpperCase().trim();

    if (!this.apiKey || this.apiKey === 'demo') {
      const mockRates: Record<string, number> = {
        USD_INR: 83.5,
        EUR_USD: 1.09,
        GBP_USD: 1.27,
      };
      const key = `${from}_${to}`;
      return {
        fromCurrency: from,
        toCurrency: to,
        exchangeRate: mockRates[key] || 1.0,
        lastUpdated: new Date().toISOString(),
      };
    }

    const response = await firstValueFrom(
      this.httpService.get(this.baseUrl, {
        params: {
          function: 'CURRENCY_EXCHANGE_RATE',
          from_currency: from,
          to_currency: to,
          apikey: this.apiKey,
        },
        timeout: 10000,
      }),
    );
    const data = response.data['Realtime Currency Exchange Rate'];
    if (!data) {
      throw new BadRequestException(
        'Failed to get exchange rate from Alpha Vantage',
      );
    }

    return {
      fromCurrency: data['1. From_Currency Code'],
      toCurrency: data['3. To_Currency Code'],
      exchangeRate: Number.parseFloat(data['5. Exchange Rate']),
      lastUpdated: data['6. Last Refreshed'],
    };
  }

  /**
   * Fetches a 30-day daily time series from Alpha Vantage, preserving the older market-data API.
   */
  async getDailyTimeSeries(symbol: string) {
    const cleanSymbol = symbol.toUpperCase().trim();
    if (!this.apiKey || this.apiKey === 'demo') {
      return {
        symbol: cleanSymbol,
        timeSeries: [
          { date: new Date().toISOString().split('T')[0], close: 150.0 },
          {
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            close: 148.5,
          },
        ],
      };
    }

    const response = await firstValueFrom(
      this.httpService.get(this.baseUrl, {
        params: {
          function: 'TIME_SERIES_DAILY',
          symbol: cleanSymbol,
          apikey: this.apiKey,
        },
        timeout: 10000,
      }),
    );

    const timeSeries = response.data['Time Series (Daily)'];
    if (!timeSeries) {
      throw new BadRequestException(
        'Failed to get daily time series from Alpha Vantage',
      );
    }

    return {
      symbol: cleanSymbol,
      timeSeries: Object.keys(timeSeries)
        .slice(0, 30)
        .map((date) => ({
          date,
          close: Number.parseFloat(timeSeries[date]['4. close']),
          open: Number.parseFloat(timeSeries[date]['1. open']),
          high: Number.parseFloat(timeSeries[date]['2. high']),
          low: Number.parseFloat(timeSeries[date]['3. low']),
          volume: Number.parseInt(timeSeries[date]['5. volume'], 10),
        })),
    };
  }

  private async fetchQuoteWithRetry(
    symbol: string,
    retryOnRateLimit: boolean,
  ): Promise<UsaFundQuote> {
    this.assertApiKey();

    const response = await firstValueFrom(
      this.httpService.get<AlphaVantageResponse>(this.baseUrl, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: this.apiKey,
        },
        timeout: 10000,
        validateStatus: () => true,
      }),
    );

    if (response.status === 429 || response.data?.Note) {
      await this.handleRateLimit(symbol);
      if (!retryOnRateLimit) {
        throw new Error('Alpha Vantage rate limit persisted after retry');
      }
      await this.sleep(60000);
      return this.fetchQuoteWithRetry(symbol, false);
    }

    if (response.data?.Information) {
      throw new ConfigException(
        `Alpha Vantage configuration error: ${response.data.Information}`,
      );
    }

    const quote = response.data?.['Global Quote'];
    if (!quote) {
      throw new Error('Missing Global Quote payload');
    }

    const price = Number.parseFloat(quote['05. price'] || '');
    const change = Number.parseFloat(quote['09. change'] || '0');
    const changePercent = Number.parseFloat(
      (quote['10. change percent'] || '0').replace('%', ''),
    );
    const latestTradingDay = this.parseUsTradingDate(
      quote['07. latest trading day'] || '',
    );

    if (!Number.isFinite(price) || !latestTradingDay) {
      throw new Error('Invalid Alpha Vantage quote values');
    }

    return {
      symbol: quote['01. symbol'] || symbol,
      name: USA_FUND_NAMES[symbol] || symbol,
      price,
      change: Number.isFinite(change) ? change : 0,
      changePercent: Number.isFinite(changePercent) ? changePercent : 0,
      latestTradingDay,
      currency: 'USD',
    };
  }

  private assertApiKey(): void {
    if (!this.apiKey || this.apiKey === 'your_key_here') {
      throw new ConfigException('ALPHA_VANTAGE_KEY is not configured');
    }
  }

  private async handleRateLimit(symbol: string): Promise<void> {
    this.logger.warn(`Alpha Vantage rate limit hit while fetching ${symbol}`);
    await this.redisService.set('alpha_vantage:rate_limit', symbol, 60);
  }

  private parseUsTradingDate(value: string): Date | null {
    if (!value) return null;

    const parsed = Date.parse(`${value}T00:00:00Z`);
    if (Number.isNaN(parsed)) return null;

    return new Date(parsed);
  }

  private getUsaTickers(): string[] {
    const configured = this.configService.get<string>('USA_TICKERS');
    if (!configured) return DEFAULT_USA_TICKERS;

    return configured
      .split(',')
      .map((ticker) => ticker.trim().toUpperCase())
      .filter(Boolean);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}
