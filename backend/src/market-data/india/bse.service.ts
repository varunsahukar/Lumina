import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BseService {
  private readonly logger = new Logger(BseService.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getStockQuote(securityId: string) {
    if (!securityId)
      throw new BadRequestException('Security ID or Symbol is required');
    const cleanId = securityId.toUpperCase().trim();

    try {
      // Mocking BSE quote fetch (e.g. SENSEX components)
      const mockPrices: Record<string, number> = {
        '500325': 2450.0, // Reliance Industries
        '532540': 3822.0, // TCS
        '500180': 1612.0, // HDFC Bank
      };

      const basePrice = mockPrices[cleanId] || 250.0;
      const variation = (Math.random() - 0.5) * 8;
      const lastPrice = parseFloat((basePrice + variation).toFixed(2));

      return {
        securityId: cleanId,
        scripName: `${cleanId} BSE Scrip`,
        lastPrice,
        change: parseFloat(variation.toFixed(2)),
        pChange: parseFloat(((variation / basePrice) * 100).toFixed(2)),
        open: basePrice,
        high: lastPrice + 2,
        low: lastPrice - 2,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(
        `BSE price fetch error for ${cleanId}: ${error.message}`,
      );
      throw new BadRequestException(
        `BSE Integration failure: ${error.message}`,
      );
    }
  }

  async getSensexIndex() {
    const baseValue = 72000.0;
    const variation = (Math.random() - 0.4) * 200; // bias positive slightly
    const value = parseFloat((baseValue + variation).toFixed(2));

    return {
      indexName: 'SENSEX',
      value,
      change: parseFloat(variation.toFixed(2)),
      pChange: parseFloat(((variation / baseValue) * 100).toFixed(2)),
      timestamp: new Date().toISOString(),
    };
  }
}
