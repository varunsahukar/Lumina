import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class YahooFinanceService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    constructor(httpService: HttpService, configService: ConfigService);
    getGlobalIndex(symbol: string): Promise<any>;
    private fetchRapidApiQuote;
    private isYahooFinanceEnabled;
    private getIndexNameBySymbol;
}
