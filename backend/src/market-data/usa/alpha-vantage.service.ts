import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AlphaVantageService {
  private readonly logger = new Logger(AlphaVantageService.name);
  private apiKey: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiKey =
      this.configService.get<string>('ALPHA_VANTAGE_API_KEY') || 'demo';
  }

  async getExchangeRate(fromCurrency: string, toCurrency: string) {
    const from = fromCurrency.toUpperCase().trim();
    const to = toCurrency.toUpperCase().trim();

    if (this.apiKey === 'demo') {
      // Mock FX Rates
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

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${this.apiKey}`,
        ),
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
        exchangeRate: parseFloat(data['5. Exchange Rate']),
        lastUpdated: data['6. Last Refreshed'],
      };
    } catch (error) {
      this.logger.error(
        `Alpha Vantage FX Rate request failed: ${error.message}`,
      );
      throw error;
    }
  }

  async getDailyTimeSeries(symbol: string) {
    const cleanSymbol = symbol.toUpperCase().trim();
    if (this.apiKey === 'demo') {
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

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${cleanSymbol}&apikey=${this.apiKey}`,
        ),
      );

      const timeSeries = response.data['Time Series (Daily)'];
      if (!timeSeries) {
        throw new BadRequestException(
          'Failed to get daily time series from Alpha Vantage',
        );
      }

      const formatted = Object.keys(timeSeries)
        .slice(0, 30)
        .map((date) => ({
          date,
          close: parseFloat(timeSeries[date]['4. close']),
          open: parseFloat(timeSeries[date]['1. open']),
          high: parseFloat(timeSeries[date]['2. high']),
          low: parseFloat(timeSeries[date]['3. low']),
          volume: parseInt(timeSeries[date]['5. volume']),
        }));

      return {
        symbol: cleanSymbol,
        timeSeries: formatted,
      };
    } catch (error) {
      this.logger.error(
        `Alpha Vantage Daily Time Series failed: ${error.message}`,
      );
      throw error;
    }
  }
}
