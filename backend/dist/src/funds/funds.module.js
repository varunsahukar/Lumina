"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundsModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const funds_controller_1 = require("./funds.controller");
const funds_service_1 = require("./funds.service");
const screener_service_1 = require("./screener.service");
const comparison_service_1 = require("./comparison.service");
const runtime_flags_1 = require("../common/runtime-flags");
const fundSyncQueueProvider = {
    provide: (0, bullmq_1.getQueueToken)('fund-sync'),
    useValue: {
        add: async () => null,
    },
};
let FundsModule = class FundsModule {
};
exports.FundsModule = FundsModule;
exports.FundsModule = FundsModule = __decorate([
    (0, common_1.Module)({
        imports: [
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
        ],
        controllers: [funds_controller_1.FundsController],
        providers: [
            funds_service_1.FundsService,
            screener_service_1.ScreenerService,
            comparison_service_1.ComparisonService,
            ...(!(0, runtime_flags_1.isRedisEnabled)() ? [fundSyncQueueProvider] : []),
        ],
        exports: [
            funds_service_1.FundsService,
            screener_service_1.ScreenerService,
            comparison_service_1.ComparisonService,
            ...(!(0, runtime_flags_1.isRedisEnabled)() ? [fundSyncQueueProvider] : []),
        ],
    })
], FundsModule);
//# sourceMappingURL=funds.module.js.map