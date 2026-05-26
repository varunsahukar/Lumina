import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class SecEdgarService {
    private httpService;
    private configService;
    private readonly logger;
    private userAgent;
    constructor(httpService: HttpService, configService: ConfigService);
    getCompanyFilings(cik: string): Promise<{
        cik: string;
        entityType: string;
        sic: string;
        sicDescription: string;
        name: string;
        tickers: string[];
        exchanges: string[];
        filings: {
            recent: {
                accessionNumber: string[];
                filingDate: string[];
                reportDate: string[];
                form: string[];
                fileNumber: string[];
                filmNumber: string[];
                items: string[];
                size: number[];
                isXBRL: number[];
                isInlineXBRL: number[];
                primaryDocument: string[];
                primaryDocDescription: string[];
            };
        };
    }>;
}
