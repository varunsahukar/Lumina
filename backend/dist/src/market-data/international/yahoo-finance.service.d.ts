import { HttpService } from '@nestjs/axios';
export declare class YahooFinanceService {
    private httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    getGlobalIndex(symbol: string): Promise<{
        symbol: string;
        indexName: string;
        price: number;
        change: number;
        pChange: number;
        timestamp: string;
    }>;
    private getIndexNameBySymbol;
}
