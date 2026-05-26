"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let ScreenerService = class ScreenerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async screenFunds(filters) {
        const { category, minAum, maxExpenseRatio, minSharpe, minReturns1y, minReturns3y, minReturns5y, sortBy = 'returns3y', sortOrder = 'desc', limit = 50, } = filters;
        const where = { isActive: true };
        if (category) {
            where.category = { equals: category, mode: 'insensitive' };
        }
        if (minAum !== undefined) {
            where.aum = { gte: minAum };
        }
        if (maxExpenseRatio !== undefined) {
            where.expenseRatio = { lte: maxExpenseRatio };
        }
        if (minSharpe !== undefined) {
            where.sharpeRatio = { gte: minSharpe };
        }
        if (minReturns1y !== undefined) {
            where.returns1y = { gte: minReturns1y };
        }
        if (minReturns3y !== undefined) {
            where.returns3y = { gte: minReturns3y };
        }
        if (minReturns5y !== undefined) {
            where.returns5y = { gte: minReturns5y };
        }
        return this.prisma.fund.findMany({
            where,
            orderBy: {
                [sortBy]: sortOrder,
            },
            take: Number(limit),
        });
    }
};
exports.ScreenerService = ScreenerService;
exports.ScreenerService = ScreenerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScreenerService);
//# sourceMappingURL=screener.service.js.map