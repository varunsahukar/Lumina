import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class NseService {
    private httpService;
    private configService;
    private readonly logger;
    private readonly apiBaseUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    getStockQuote(symbol: string): Promise<{
        symbol: string;
        companyName: string;
        lastPrice: number;
        change: number;
        pChange: number;
        open: number;
        dayHigh: number;
        dayLow: number;
        volume: number;
        timestamp: string;
    }>;
}
