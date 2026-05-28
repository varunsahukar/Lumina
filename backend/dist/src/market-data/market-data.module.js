"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketDataModule = void 0;
const axios_1 = require("@nestjs/axios");
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const bullmq_2 = require("@nestjs/bullmq");
const runtime_flags_1 = require("../common/runtime-flags");
const funds_module_1 = require("../funds/funds.module");
const bse_service_1 = require("./india/bse.service");
const amfi_service_1 = require("./india/amfi.service");
const mfapi_service_1 = require("./india/mfapi.service");
const nse_service_1 = require("./india/nse.service");
const yahoo_finance_service_1 = require("./international/yahoo-finance.service");
const startup_sync_service_1 = require("./startup-sync.service");
const sync_processor_1 = require("./sync.processor");
const alpha_vantage_service_1 = require("./usa/alpha-vantage.service");
const finnhub_service_1 = require("./usa/finnhub.service");
const sec_edgar_service_1 = require("./usa/sec-edgar.service");
const fundSyncQueueProvider = {
    provide: (0, bullmq_2.getQueueToken)('fund-sync'),
    useValue: {
        add: async () => null,
    },
};
let MarketDataModule = class MarketDataModule {
};
exports.MarketDataModule = MarketDataModule;
exports.MarketDataModule = MarketDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule.register({
                timeout: 10000,
            }),
            ...((0, runtime_flags_1.isRedisEnabled)()
                ? [
                    bullmq_1.BullModule.registerQueue({
                        name: 'fund-sync',
                        defaultJobOptions: {
                            attempts: 3,
                            backoff: {
                                type: 'exponential',
                                delay: 5000,
                            },
                            removeOnComplete: 100,
                            removeOnFail: 1000,
                        },
                    }),
                ]
                : []),
            schedule_1.ScheduleModule.forRoot(),
            funds_module_1.FundsModule,
        ],
        providers: [
            amfi_service_1.AmfiService,
            mfapi_service_1.MfApiService,
            nse_service_1.NseService,
            bse_service_1.BseService,
            finnhub_service_1.FinnhubService,
            alpha_vantage_service_1.AlphaVantageService,
            sec_edgar_service_1.SecEdgarService,
            yahoo_finance_service_1.YahooFinanceService,
            startup_sync_service_1.MarketDataStartupService,
            ...((0, runtime_flags_1.isRedisEnabled)() ? [sync_processor_1.FundSyncProcessor] : [fundSyncQueueProvider]),
        ],
        exports: [
            amfi_service_1.AmfiService,
            mfapi_service_1.MfApiService,
            alpha_vantage_service_1.AlphaVantageService,
            nse_service_1.NseService,
            bse_service_1.BseService,
            finnhub_service_1.FinnhubService,
            sec_edgar_service_1.SecEdgarService,
            yahoo_finance_service_1.YahooFinanceService,
        ],
    })
], MarketDataModule);
//# sourceMappingURL=market-data.module.js.map