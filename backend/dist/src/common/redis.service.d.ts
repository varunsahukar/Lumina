import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private client?;
    private readonly enabled;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    isEnabled(): boolean;
    getClient(): Redis;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<number>;
    setJson<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
    getJson<T>(key: string): Promise<T | null>;
}
