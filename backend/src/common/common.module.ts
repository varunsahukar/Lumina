import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';
import { QueueConfigModule } from './queue/queue.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    QueueConfigModule,
  ],
  providers: [PrismaService, RedisService],
  exports: [ConfigModule, PrismaService, RedisService, QueueConfigModule],
})
export class CommonModule {}
