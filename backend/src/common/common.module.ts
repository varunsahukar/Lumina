import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';
import { QueueConfigModule } from './queue/queue.module';
import { isRedisEnabled } from './runtime-flags';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env', '../.env'],
    }),
    ...(isRedisEnabled() ? [QueueConfigModule] : []),
  ],
  providers: [PrismaService, RedisService],
  exports: [
    ConfigModule,
    PrismaService,
    RedisService,
    ...(isRedisEnabled() ? [QueueConfigModule] : []),
  ],
})
export class CommonModule {}
