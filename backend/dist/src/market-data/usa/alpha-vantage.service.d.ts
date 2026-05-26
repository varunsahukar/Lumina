import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
export declare class AlphaVantageService {
    private httpService;
    private configService;
    private readonly logger;
    private apiKey;
    constructor(httpService: HttpService, configService: ConfigService);
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
}
