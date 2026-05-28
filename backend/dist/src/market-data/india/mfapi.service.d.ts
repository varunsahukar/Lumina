import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { FundData, FundMeta, NavPoint } from '../market-data.types';
export declare class MfApiService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly baseUrl;
    private lastBulkErrors;
    constructor(httpService: HttpService, configService: ConfigService);
    fetchFundMeta(schemeCode: string): Promise<FundMeta>;
    fetchFundHistory(schemeCode: string, days: number): Promise<NavPoint[]>;
    fetchAllSchemeCodes(): Promise<{
        schemeCode: string;
        schemeName: string;
    }[]>;
    bulkFetchFunds(codes: string[]): Promise<FundData[]>;
    getLastBulkErrors(): string[];
    private fetchFundDataWithRetry;
    private fetchFundData;
    private toNavPoint;
    private parseMfApiDate;
    private sleep;
}
