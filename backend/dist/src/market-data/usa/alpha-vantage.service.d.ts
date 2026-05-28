import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma.service';
import { RedisService } from '../../common/redis.service';
import { FundsService } from '../../funds/funds.service';
import { UsaFundQuote } from '../market-data.types';
export declare class ConfigException extends Error {
    constructor(message: string);
}
export declare class AlphaVantageService {
    private readonly httpService;
    private readonly configService;
    private readonly redisService;
    private readonly fundsService;
    private readonly prisma;
    private readonly logger;
    private readonly apiKey;
    private readonly baseUrl;
    private lastFetchErrors;
    constructor(httpService: HttpService, configService: ConfigService, redisService: RedisService, fundsService: FundsService, prisma: PrismaService);
    fetchQuote(symbol: string): Promise<UsaFundQuote>;
    fetchAllQuotes(): Promise<UsaFundQuote[]>;
    syncUsaFunds(): Promise<void>;
    getLastFetchErrors(): string[];
    getExchangeRate(fromCurrency: string, toCurrency: string): Promise<{
        fromCurrency: any;
        toCurrency: any;
        exchangeRate: number;
        lastUpdated: any;
    }>;
    getDailyTimeSeries(symbol: string): Promise<{
        symbol: string;
        timeSeries: {
            date: string;
            close: number;
        }[];
    } | {
        symbol: string;
        timeSeries: {
            date: string;
            close: number;
            open: number;
            high: number;
            low: number;
            volume: number;
        }[];
    }>;
    private fetchQuoteWithRetry;
    private assertApiKey;
    private handleRateLimit;
    private parseUsTradingDate;
    private getUsaTickers;
    private sleep;
    private getErrorMessage;
}
