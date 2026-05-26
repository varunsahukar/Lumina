import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Custom Modules
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { MarketDataModule } from './market-data/market-data.module';
import { FundsModule } from './funds/funds.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { OrdersModule } from './orders/orders.module';
import { ResearchModule } from './research/research.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    MarketDataModule,
    FundsModule,
    PortfolioModule,
    OrdersModule,
    ResearchModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
