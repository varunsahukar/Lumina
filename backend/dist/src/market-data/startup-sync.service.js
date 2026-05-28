"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MarketDataStartupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketDataStartupService = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
const prisma_service_1 = require("../common/prisma.service");
const redis_service_1 = require("../common/redis.service");
const runtime_flags_1 = require("../common/runtime-flags");
const market_data_types_1 = require("./market-data.types");
let MarketDataStartupService = MarketDataStartupService_1 = class MarketDataStartupService {
    prisma;
    redisService;
    fundSyncQueue;
    logger = new common_1.Logger(MarketDataStartupService_1.name);
    constructor(prisma, redisService, fundSyncQueue) {
        this.prisma = prisma;
        this.redisService = redisService;
        this.fundSyncQueue = fundSyncQueue;
    }
    async onModuleInit() {
        await this.checkDatabase();
        if (!(0, runtime_flags_1.isRedisEnabled)()) {
            this.logger.warn(`${new Date().toISOString()} Redis disabled; startup sync queue skipped`);
            return;
        }
        await this.checkRedis();
        await this.queueStartupSyncIfNeeded();
    }
    async checkDatabase() {
        await this.prisma.$queryRaw `SELECT 1`;
        this.logger.log(`${new Date().toISOString()} database connection OK`);
    }
    async checkRedis() {
        await this.redisService.getClient().ping();
        this.logger.log(`${new Date().toISOString()} redis connection OK`);
    }
    async queueStartupSyncIfNeeded() {
        const [count, latestSync] = await Promise.all([
            this.prisma.fund.count(),
            this.prisma.fund.aggregate({ _max: { lastSyncedAt: true } }),
        ]);
        const lastSyncedAt = latestSync._max.lastSyncedAt;
        const isStale = !lastSyncedAt ||
            Date.now() - lastSyncedAt.getTime() > market_data_types_1.DATA_FRESHNESS_MAX_AGE_MS;
        if (count === 0) {
            await this.enqueueStartupJobs('fund table is empty');
            return;
        }
        if (isStale) {
            await this.enqueueStartupJobs(`last sync is older than ${market_data_types_1.DATA_FRESHNESS_MAX_AGE_MS / 3600000} hours`);
            return;
        }
        this.logger.log(`${new Date().toISOString()} fund data is fresh; startup sync skipped`);
    }
    async enqueueStartupJobs(reason) {
        const options = {
            attempts: 3,
            backoff: { type: 'exponential', delay: 5000 },
            removeOnComplete: 100,
            removeOnFail: 1000,
        };
        await Promise.all([
            this.fundSyncQueue.add('sync-india-funds', { reason }, options),
            this.fundSyncQueue.add('sync-usa-funds', { reason }, options),
        ]);
        this.logger.log(`${new Date().toISOString()} queued startup sync jobs: ${reason}`);
    }
};
exports.MarketDataStartupService = MarketDataStartupService;
exports.MarketDataStartupService = MarketDataStartupService = MarketDataStartupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bullmq_1.InjectQueue)('fund-sync')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        bullmq_2.Queue])
], MarketDataStartupService);
//# sourceMappingURL=startup-sync.service.js.map