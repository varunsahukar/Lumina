import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CamsService } from './cams.service';
import { KfintechService } from './kfintech.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, CamsService, KfintechService],
  exports: [OrdersService, CamsService, KfintechService],
})
export class OrdersModule {}
