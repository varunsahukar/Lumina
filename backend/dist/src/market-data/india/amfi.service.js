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
var AmfiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmfiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const rxjs_1 = require("rxjs");
const prisma_service_1 = require("../../common/prisma.service");
const redis_service_1 = require("../../common/redis.service");
const funds_service_1 = require("../../funds/funds.service");
let AmfiService = AmfiService_1 = class AmfiService {
    httpService;
    configService;
    fundsService;
    prisma;
    redisService;
    logger = new common_1.Logger(AmfiService_1.name);
    amfiUrl;
    retryTimer;
    constructor(httpService, configService, fundsService, prisma, redisService) {
        this.httpService = httpService;
        this.configService = configService;
        this.fundsService = fundsService;
        this.prisma = prisma;
        this.redisService = redisService;
        this.amfiUrl =
            this.configService.get('AMFI_NAV_URL') ||
                'https://www.amfiindia.com/spages/NAVAll.txt';
    }
    async fetchBulkNav() {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.amfiUrl, {
            responseType: 'text',
            timeout: 10000,
        }));
        return this.parseAmfiText(response.data);
    }
    parseAmfiText(raw) {
        return raw
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => /^\d/.test(line))
            .map((line) => line.split(';').map((field) => field.trim()))
            .filter((fields) => fields.length >= 8)
            .map((fields) => {
            const nav = Number.parseFloat(fields[4]);
            const date = this.parseAmfiDate(fields[7]);
            if (!Number.isFinite(nav) || !date)
                return null;
            return {
                schemeCode: fields[0],
                name: fields[3],
                nav,
                date,
            };
        })
            .filter((record) => Boolean(record));
    }
    async syncNightlyNavs() {
        const startedAt = Date.now();
        try {
            this.logger.log('Starting AMFI bulk NAV sync');
            const records = await this.fetchBulkNav();
            await this.fundsService.upsertFundsFromAmfi(records);
            await this.redisService.set('amfi:last_sync', new Date().toISOString());
            await this.prisma.syncLog.create({
                data: {
                    source: 'AMFI',
                    status: 'SUCCESS',
                    fundsSync: records.length,
                    errors: [],
                    duration: Date.now() - startedAt,
                },
            });
            this.logger.log(`AMFI sync completed for ${records.length} records`);
        }
        catch (error) {
            const message = error?.message || String(error);
            const timestamp = new Date().toISOString();
            console.error(`[${timestamp}] AMFI txt fetch failed: ${message}`);
            await this.prisma.syncLog.create({
                data: {
                    source: 'AMFI',
                    status: 'FAILED',
                    fundsSync: 0,
                    errors: [message],
                    duration: Date.now() - startedAt,
                },
            });
            this.scheduleRetry();
        }
    }
    async fetchAndSyncNavs() {
        const records = await this.fetchBulkNav();
        await this.fundsService.upsertFundsFromAmfi(records);
        await this.redisService.set('amfi:last_sync', new Date().toISOString());
        return { totalProcessed: records.length, updated: records.length };
    }
    parseAmfiDate(value) {
        if (!value)
            return null;
        const parsed = Date.parse(`${value} UTC`);
        if (!Number.isNaN(parsed)) {
            const date = new Date(parsed);
            return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
        }
        return null;
    }
    scheduleRetry() {
        if (this.retryTimer)
            return;
        this.retryTimer = setTimeout(() => {
            this.retryTimer = undefined;
            void this.syncNightlyNavs();
        }, 30 * 60 * 1000);
    }
};
exports.AmfiService = AmfiService;
__decorate([
    (0, schedule_1.Cron)(process.env.AMFI_SYNC_CRON || '30 23 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AmfiService.prototype, "syncNightlyNavs", null);
exports.AmfiService = AmfiService = AmfiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        funds_service_1.FundsService,
        prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], AmfiService);
//# sourceMappingURL=amfi.service.js.map