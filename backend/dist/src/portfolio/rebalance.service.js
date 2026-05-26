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
exports.RebalanceService = void 0;
const common_1 = require("@nestjs/common");
const portfolio_service_1 = require("./portfolio.service");
const prisma_service_1 = require("../common/prisma.service");
let RebalanceService = class RebalanceService {
    portfolioService;
    prisma;
    constructor(portfolioService, prisma) {
        this.portfolioService = portfolioService;
        this.prisma = prisma;
    }
    async calculateRebalanceSuggestions(portfolioId, targets) {
        const totalTarget = targets.reduce((sum, t) => sum + t.targetWeightPct, 0);
        if (Math.abs(totalTarget - 100) > 0.01) {
            throw new Error('Target allocation percentages must sum up to exactly 100%');
        }
        const valuation = await this.portfolioService.getPortfolioValuation(portfolioId);
        const totalCurrentValue = valuation.totalCurrentValue;
        if (totalCurrentValue === 0) {
            throw new common_1.NotFoundException('Cannot rebalance an empty portfolio. Please purchase assets first.');
        }
        const suggestions = [];
        for (const target of targets) {
            const targetWeight = target.targetWeightPct / 100;
            const targetValue = totalCurrentValue * targetWeight;
            const currentHolding = valuation.holdings.find((h) => h.fundId === target.fundId);
            const currentValue = currentHolding ? currentHolding.currentValue : 0;
            const schemeName = currentHolding
                ? currentHolding.schemeName
                : (await this.prisma.fund.findUnique({ where: { id: target.fundId } }))
                    ?.schemeName || 'Unknown Fund';
            const difference = targetValue - currentValue;
            const currentWeightPct = (currentValue / totalCurrentValue) * 100;
            suggestions.push({
                fundId: target.fundId,
                schemeName,
                currentWeightPct,
                targetWeightPct: target.targetWeightPct,
                currentValue,
                targetValue,
                action: difference > 0 ? 'BUY' : difference < 0 ? 'SELL' : 'HOLD',
                amount: Math.abs(difference),
                units: currentHolding && currentHolding.currentNav > 0
                    ? Math.abs(difference) / currentHolding.currentNav
                    : 0,
            });
        }
        return {
            portfolioId,
            totalCurrentValue,
            suggestions,
        };
    }
};
exports.RebalanceService = RebalanceService;
exports.RebalanceService = RebalanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService,
        prisma_service_1.PrismaService])
], RebalanceService);
//# sourceMappingURL=rebalance.service.js.map