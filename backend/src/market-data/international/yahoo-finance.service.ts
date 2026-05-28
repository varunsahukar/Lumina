import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class YahooFinanceService {
  private readonly logger = new Logger(YahooFinanceService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Returns a global index quote, using RapidAPI Yahoo Finance only when explicitly enabled.
   */
  async getGlobalIndex(symbol: string) {
    // S&P 500: ^GSPC, Nasdaq: ^IXIC, Dow Jones: ^DJI, FTSE 100: ^FTSE, Nikkei: ^N225
    const cleanSymbol = symbol.trim();

    try {
      if (this.isYahooFinanceEnabled()) {
        return this.fetchRapidApiQuote(cleanSymbol);
      }

      const mockValues: Record<string, number> = {
        '^GSPC': 5100.5,
        '^IXIC': 16120.3,
        '^DJI': 39130.0,
        '^N225': 38900.2,
      };

      const baseVal = mockValues[cleanSymbol] || 4500.0;
      const variation = (Math.random() - 0.45) * 45;
      const price = parseFloat((baseVal + variation).toFixed(2));

      return {
        symbol: cleanSymbol,
        indexName: this.getIndexNameBySymbol(cleanSymbol),
        price,
        change: parseFloat(variation.toFixed(2)),
        pChange: parseFloat(((variation / baseVal) * 100).toFixed(2)),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(
        `Yahoo Finance fetch failed for index ${cleanSymbol}: ${error.message}`,
      );
      throw new BadRequestException(
        `Yahoo Finance index quote unavailable: ${error.message}`,
      );
    }
  }

  private async fetchRapidApiQuote(symbol: string) {
    const apiKey = this.configService.get<string>('RAPIDAPI_KEY');
    if (!apiKey) {
      throw new BadRequestException('RAPIDAPI_KEY is required');
    }

    const host =
      this.configService.get<string>('YAHOO_FINANCE_RAPIDAPI_HOST') ||
      'yahoo-finance15.p.rapidapi.com';
    const response = await firstValueFrom(
      this.httpService.get(`https://${host}/api/v1/markets/stock/quotes`, {
        params: { ticker: symbol },
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': host,
        },
        timeout: 10000,
      }),
    );

    return response.data;
  }

  private isYahooFinanceEnabled(): boolean {
    return (
      this.configService.get<string>('ENABLE_YAHOO_FINANCE')?.toLowerCase() ===
      'true'
    );
  }

  private getIndexNameBySymbol(symbol: string): string {
    switch (symbol) {
      case '^GSPC':
        return 'S&P 500';
      case '^IXIC':
        return 'NASDAQ';
      case '^DJI':
        return 'Dow Jones';
      case '^N225':
        return 'Nikkei 225';
      default:
        return 'Global Index';
    }
  }
}
