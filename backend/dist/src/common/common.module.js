"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("./prisma.service");
const redis_service_1 = require("./redis.service");
const queue_module_1 = require("./queue/queue.module");
const runtime_flags_1 = require("./runtime-flags");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env', '../.env'],
            }),
            ...((0, runtime_flags_1.isRedisEnabled)() ? [queue_module_1.QueueConfigModule] : []),
        ],
        providers: [prisma_service_1.PrismaService, redis_service_1.RedisService],
        exports: [
            config_1.ConfigModule,
            prisma_service_1.PrismaService,
            redis_service_1.RedisService,
            ...((0, runtime_flags_1.isRedisEnabled)() ? [queue_module_1.QueueConfigModule] : []),
        ],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map