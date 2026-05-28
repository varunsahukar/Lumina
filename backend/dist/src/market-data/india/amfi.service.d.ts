import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma.service';
import { RedisService } from '../../common/redis.service';
import { FundsService } from '../../funds/funds.service';
import { AmfiNavRecord } from '../market-data.types';
export declare class AmfiService {
    private readonly httpService;
    private readonly configService;
    private readonly fundsService;
    private readonly prisma;
    private readonly redisService;
    private readonly logger;
    private readonly amfiUrl;
    private retryTimer?;
    constructor(httpService: HttpService, configService: ConfigService, fundsService: FundsService, prisma: PrismaService, redisService: RedisService);
    fetchBulkNav(): Promise<AmfiNavRecord[]>;
    parseAmfiText(raw: string): AmfiNavRecord[];
    syncNightlyNavs(): Promise<void>;
    fetchAndSyncNavs(): Promise<{
        totalProcessed: number;
        updated: number;
    }>;
    private parseAmfiDate;
    private scheduleRetry;
}
