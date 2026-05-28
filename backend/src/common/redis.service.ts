import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { isRedisEnabled } from './runtime-flags';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client?: Redis;
  private readonly enabled = isRedisEnabled();

  constructor(private configService: ConfigService) {}

  /**
   * Creates the Redis client used by cache-aside reads and BullMQ.
   */
  onModuleInit() {
    if (!this.enabled) {
      return;
    }

    const redisUrl = this.configService.get<string>('REDIS_URL');
    const redisHost =
      this.configService.get<string>('REDIS_HOST') || 'localhost';
    const redisPort =
      Number(this.configService.get<string>('REDIS_PORT')) || 6379;

    this.client = redisUrl
      ? new Redis(redisUrl, { maxRetriesPerRequest: null })
      : new Redis({
          host: redisHost,
          port: redisPort,
          maxRetriesPerRequest: null,
        });
  }

  /**
   * Disconnects the Redis client on application shutdown.
   */
  onModuleDestroy() {
    this.client?.disconnect();
  }

  /**
   * Returns true when Redis-backed cache and queues are enabled.
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Returns the underlying ioredis client.
   */
  getClient(): Redis {
    if (!this.client) {
      throw new Error('Redis is disabled or not initialized');
    }

    return this.client;
  }

  /**
   * Reads a string value from Redis.
   */
  async get(key: string): Promise<string | null> {
    if (!this.enabled) return null;
    return this.getClient().get(key);
  }

  /**
   * Writes a string value to Redis with an optional TTL.
   */
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.enabled) return;

    if (ttlSeconds) {
      await this.getClient().set(key, value, 'EX', ttlSeconds);
    } else {
      await this.getClient().set(key, value);
    }
  }

  /**
   * Deletes a Redis key.
   */
  async del(key: string): Promise<number> {
    if (!this.enabled) return 0;
    return this.getClient().del(key);
  }

  /**
   * Serializes and writes JSON to Redis with an optional TTL.
   */
  async setJson<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    await this.set(key, JSON.stringify(value), ttlSeconds);
  }

  /**
   * Reads and deserializes JSON from Redis.
   */
  async getJson<T>(key: string): Promise<T | null> {
    const data = await this.get(key);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }
}
