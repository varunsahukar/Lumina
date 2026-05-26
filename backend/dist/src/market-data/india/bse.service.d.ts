import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class BseService {
    private httpService;
    private configService;
    private readonly logger;
    constructor(httpService: HttpService, configService: ConfigService);
    getStockQuote(securityId: string): Promise<{
        securityId: string;
        scripName: string;
        lastPrice: number;
        change: number;
        pChange: number;
        open: number;
        high: number;
        low: number;
        timestamp: string;
    }>;
    getSensexIndex(): Promise<{
        indexName: string;
        value: number;
        change: number;
        pChange: number;
        timestamp: string;
    }>;
}
