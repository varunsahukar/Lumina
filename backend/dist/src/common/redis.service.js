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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = require("@nestjs/config");
const runtime_flags_1 = require("./runtime-flags");
let RedisService = class RedisService {
    configService;
    client;
    enabled = (0, runtime_flags_1.isRedisEnabled)();
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        if (!this.enabled) {
            return;
        }
        const redisUrl = this.configService.get('REDIS_URL');
        const redisHost = this.configService.get('REDIS_HOST') || 'localhost';
        const redisPort = Number(this.configService.get('REDIS_PORT')) || 6379;
        this.client = redisUrl
            ? new ioredis_1.default(redisUrl, { maxRetriesPerRequest: null })
            : new ioredis_1.default({
                host: redisHost,
                port: redisPort,
                maxRetriesPerRequest: null,
            });
    }
    onModuleDestroy() {
        this.client?.disconnect();
    }
    isEnabled() {
        return this.enabled;
    }
    getClient() {
        if (!this.client) {
            throw new Error('Redis is disabled or not initialized');
        }
        return this.client;
    }
    async get(key) {
        if (!this.enabled)
            return null;
        return this.getClient().get(key);
    }
    async set(key, value, ttlSeconds) {
        if (!this.enabled)
            return;
        if (ttlSeconds) {
            await this.getClient().set(key, value, 'EX', ttlSeconds);
        }
        else {
            await this.getClient().set(key, value);
        }
    }
    async del(key) {
        if (!this.enabled)
            return 0;
        return this.getClient().del(key);
    }
    async setJson(key, value, ttlSeconds) {
        await this.set(key, JSON.stringify(value), ttlSeconds);
    }
    async getJson(key) {
        const data = await this.get(key);
        if (!data)
            return null;
        try {
            return JSON.parse(data);
        }
        catch {
            return null;
        }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map