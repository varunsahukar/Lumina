import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import WebSocket from 'ws';
import type { RawData } from 'ws';

@Injectable()
export class FinnhubService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(FinnhubService.name);
  private apiKey: string;
  private wsUrl: string;
  private ws: WebSocket | null = null;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiKey =
      this.configService.get<string>('FINNHUB_API_KEY') || 'mock-finnhub-key';
    this.wsUrl = `wss://ws.finnhub.io?token=${this.apiKey}`;
  }

  onModuleInit() {
    if (this.apiKey !== 'mock-finnhub-key') {
      this.connectWebSocket();
    } else {
      this.logger.log('Finnhub API Key is mock. WebSocket connection skipped.');
    }
  }

  onModuleDestroy() {
    this.ws?.close();
  }

  private connectWebSocket() {
    try {
      const ws = new WebSocket(this.wsUrl);
      this.ws = ws;

      ws.on('open', () => {
        this.logger.log('Connected to Finnhub WebSocket server');
        // Subscribe to standard symbols (e.g. AAPL, MSFT)
        ws.send(
          JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' }),
        );
        ws.send(JSON.stringify({ type: 'subscribe', symbol: 'AAPL' }));
      });

      ws.on('message', (data) => {
        try {
          const rawPacket = this.decodeWebSocketPacket(data);
          const parsed = JSON.parse(rawPacket);
          if (parsed.type === 'trade') {
            this.logger.debug(
              `Real-time trade parsed: ${JSON.stringify(parsed.data)}`,
            );
            // Here, we can dispatch to Socket.IO gateway or update database/cache
          }
        } catch (e) {
          this.logger.error(
            `Error parsing Finnhub WebSocket packet: ${e.message}`,
          );
        }
      });

      ws.on('error', (err) => {
        this.logger.error(`Finnhub WebSocket error: ${err.message}`);
      });

      ws.on('close', () => {
        this.logger.log(
          'Finnhub WebSocket connection closed. Reconnecting in 10s...',
        );
        setTimeout(() => this.connectWebSocket(), 10000);
      });
    } catch (error) {
      this.logger.error(
        `Failed to initiate Finnhub WebSocket: ${error.message}`,
      );
    }
  }

  private decodeWebSocketPacket(data: RawData): string {
    if (typeof data === 'string') {
      return data;
    }

    if (Buffer.isBuffer(data)) {
      return data.toString('utf8');
    }

    if (data instanceof ArrayBuffer) {
      return Buffer.from(data).toString('utf8');
    }

    return Buffer.concat(data).toString('utf8');
  }

  async getUsStockQuote(symbol: string) {
    const cleanSymbol = symbol.toUpperCase().trim();
    if (this.apiKey === 'mock-finnhub-key') {
      // Mock quote
      return {
        symbol: cleanSymbol,
        currentPrice: 180.5 + Math.random() * 5,
        highPrice: 183.0,
        lowPrice: 179.2,
        openPrice: 180.1,
        previousClosePrice: 179.8,
        timestamp: Math.floor(Date.now() / 1000),
      };
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://finnhub.io/api/v1/quote?symbol=${cleanSymbol}&token=${this.apiKey}`,
        ),
      );
      const data = response.data;
      return {
        symbol: cleanSymbol,
        currentPrice: data.c,
        highPrice: data.h,
        lowPrice: data.l,
        openPrice: data.o,
        previousClosePrice: data.pc,
        timestamp: data.t,
      };
    } catch (error) {
      this.logger.error(
        `Finnhub HTTP API request failed for ${cleanSymbol}: ${error.message}`,
      );
      throw error;
    }
  }
}
