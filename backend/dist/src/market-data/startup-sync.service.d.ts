import { OnModuleInit } from '@nestjs/common';
import { Queue } from 'bullmq';
import { PrismaService } from '../common/prisma.service';
import { RedisService } from '../common/redis.service';
export declare class MarketDataStartupService implements OnModuleInit {
    private readonly prisma;
    private readonly redisService;
    private readonly fundSyncQueue;
    private readonly logger;
    constructor(prisma: PrismaService, redisService: RedisService, fundSyncQueue: Queue);
    onModuleInit(): Promise<void>;
    private checkDatabase;
    private checkRedis;
    private queueStartupSyncIfNeeded;
    private enqueueStartupJobs;
}
