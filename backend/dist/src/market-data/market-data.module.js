"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketDataModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const amfi_service_1 = require("./india/amfi.service");
const nse_service_1 = require("./india/nse.service");
const bse_service_1 = require("./india/bse.service");
const finnhub_service_1 = require("./usa/finnhub.service");
const alpha_vantage_service_1 = require("./usa/alpha-vantage.service");
const sec_edgar_service_1 = require("./usa/sec-edgar.service");
const yahoo_finance_service_1 = require("./international/yahoo-finance.service");
let MarketDataModule = class MarketDataModule {
};
exports.MarketDataModule = MarketDataModule;
exports.MarketDataModule = MarketDataModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [
            amfi_service_1.AmfiService,
            nse_service_1.NseService,
            bse_service_1.BseService,
            finnhub_service_1.FinnhubService,
            alpha_vantage_service_1.AlphaVantageService,
            sec_edgar_service_1.SecEdgarService,
            yahoo_finance_service_1.YahooFinanceService,
        ],
        exports: [
            amfi_service_1.AmfiService,
            nse_service_1.NseService,
            bse_service_1.BseService,
            finnhub_service_1.FinnhubService,
            alpha_vantage_service_1.AlphaVantageService,
            sec_edgar_service_1.SecEdgarService,
            yahoo_finance_service_1.YahooFinanceService,
        ],
    })
], MarketDataModule);
//# sourceMappingURL=market-data.module.js.map