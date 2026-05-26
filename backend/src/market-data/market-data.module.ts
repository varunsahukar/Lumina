import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

// Indian Market Services
import { AmfiService } from './india/amfi.service';
import { NseService } from './india/nse.service';
import { BseService } from './india/bse.service';

// US Market Services
import { FinnhubService } from './usa/finnhub.service';
import { AlphaVantageService } from './usa/alpha-vantage.service';
import { SecEdgarService } from './usa/sec-edgar.service';

// International Market Services
import { YahooFinanceService } from './international/yahoo-finance.service';

@Module({
  imports: [HttpModule],
  providers: [
    AmfiService,
    NseService,
    BseService,
    FinnhubService,
    AlphaVantageService,
    SecEdgarService,
    YahooFinanceService,
  ],
  exports: [
    AmfiService,
    NseService,
    BseService,
    FinnhubService,
    AlphaVantageService,
    SecEdgarService,
    YahooFinanceService,
  ],
})
export class MarketDataModule {}
