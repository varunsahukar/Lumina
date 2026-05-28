import { WorkerHost } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bullmq';
import { PrismaService } from '../common/prisma.service';
import { RedisService } from '../common/redis.service';
import { FundsService } from '../funds/funds.service';
import { AmfiService } from './india/amfi.service';
import { MfApiService } from './india/mfapi.service';
import { AlphaVantageService } from './usa/alpha-vantage.service';
type SyncJobName = 'sync-india-funds' | 'sync-usa-funds' | 'sync-amfi-bulk';
export declare class FundSyncProcessor extends WorkerHost {
    private readonly mfApiService;
    private readonly amfiService;
    private readonly alphaVantageService;
    private readonly fundsService;
    private readonly prisma;
    private readonly redisService;
    private readonly configService;
    private readonly logger;
    constructor(mfApiService: MfApiService, amfiService: AmfiService, alphaVantageService: AlphaVantageService, fundsService: FundsService, prisma: PrismaService, redisService: RedisService, configService: ConfigService);
    process(job: Job<unknown, unknown, SyncJobName>): Promise<unknown>;
    private syncIndiaFunds;
    private syncUsaFunds;
    private syncAmfiBulk;
    private resolveIndiaSchemeCodes;
    private resolveUsaTickers;
    private getStringArray;
}
export {};
