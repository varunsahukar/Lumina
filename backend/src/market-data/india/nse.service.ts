import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NseService {
  private readonly logger = new Logger(NseService.name);
  private readonly apiBaseUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiBaseUrl =
      this.configService.get<string>('NSE_API_BASE_URL') ||
      'https://www.nseindia.com/api';
  }

  async getStockQuote(symbol: string) {
    if (!symbol) throw new BadRequestException('Symbol must be specified');
    const cleanSymbol = symbol.toUpperCase().trim();

    try {
      // In production, we fetch from NSE APIs requiring cookie management:
      // const response = await firstValueFrom(
      //   this.httpService.get(`${this.apiBaseUrl}/quote-equity?symbol=${cleanSymbol}`, {
      //     headers: { 'User-Agent': 'Mozilla/5.0' }
      //   })
      // );
      // return response.data;

      // Providing a realistic mock for development
      const mockPrices: Record<string, number> = {
        RELIANCE: 2450.5,
        TCS: 3820.15,
        INFY: 1420.8,
        HDFCBANK: 1610.4,
        ICICIBANK: 980.2,
      };

      const basePrice = mockPrices[cleanSymbol] || 150.0;
      const variation = (Math.random() - 0.5) * 10;
      const currentPrice = parseFloat((basePrice + variation).toFixed(2));
      const change = parseFloat(variation.toFixed(2));
      const pChange = parseFloat(((change / basePrice) * 100).toFixed(2));

      return {
        symbol: cleanSymbol,
        companyName: `${cleanSymbol} Industries Ltd`,
        lastPrice: currentPrice,
        change,
        pChange,
        open: basePrice,
        dayHigh: parseFloat((currentPrice + Math.random() * 5).toFixed(2)),
        dayLow: parseFloat((currentPrice - Math.random() * 5).toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 50000,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch NSE stock quote for ${cleanSymbol}: ${error.message}`,
      );
      throw new BadRequestException(
        `Unable to fetch NSE quote: ${error.message}`,
      );
    }
  }
}
