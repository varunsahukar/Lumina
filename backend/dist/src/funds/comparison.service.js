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
exports.ComparisonService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let ComparisonService = class ComparisonService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async compareFunds(fundIds) {
        if (!fundIds || fundIds.length === 0) {
            throw new common_1.BadRequestException('At least one fund ID must be specified for comparison');
        }
        if (fundIds.length > 5) {
            throw new common_1.BadRequestException('Cannot compare more than 5 funds at a time');
        }
        const funds = await this.prisma.fund.findMany({
            where: {
                id: { in: fundIds },
                isActive: true,
            },
            include: {
                navHistory: {
                    orderBy: { date: 'desc' },
                    take: 12,
                },
            },
        });
        if (funds.length === 0) {
            throw new common_1.BadRequestException('None of the specified funds could be found');
        }
        return {
            comparedFunds: funds.map((fund) => ({
                id: fund.id,
                schemeName: fund.schemeName,
                schemeCode: fund.schemeCode,
                amcName: fund.amcName,
                category: fund.category,
                subCategory: fund.subCategory,
                nav: fund.nav,
                aum: fund.aum,
                expenseRatio: fund.expenseRatio,
                sharpeRatio: fund.sharpeRatio,
                alpha: fund.alpha,
                beta: fund.beta,
                stdDeviation: fund.stdDeviation,
                returns1y: fund.returns1y,
                returns3y: fund.returns3y,
                returns5y: fund.returns5y,
                returns10y: fund.returns10y,
                managerName: fund.managerName,
                benchmarkIndex: fund.benchmarkIndex,
                navTrend: fund.navHistory.reverse().map((h) => ({
                    date: h.date,
                    nav: h.nav,
                })),
            })),
            bestPerformer1y: [...funds].sort((a, b) => Number(b.returns1y || 0) - Number(a.returns1y || 0))[0]?.schemeName || null,
            bestPerformer3y: [...funds].sort((a, b) => Number(b.returns3y || 0) - Number(a.returns3y || 0))[0]?.schemeName || null,
            lowestExpenseRatio: [...funds].sort((a, b) => Number(a.expenseRatio || 99) - Number(b.expenseRatio || 99))[0]?.schemeName || null,
            highestSharpeRatio: [...funds].sort((a, b) => Number(b.sharpeRatio || -99) - Number(a.sharpeRatio || -99))[0]?.schemeName || null,
        };
    }
};
exports.ComparisonService = ComparisonService;
exports.ComparisonService = ComparisonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ComparisonService);
//# sourceMappingURL=comparison.service.js.map