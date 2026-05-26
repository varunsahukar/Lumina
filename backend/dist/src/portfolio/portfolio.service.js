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
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let PortfolioService = class PortfolioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPortfolio(userId, name) {
        return this.prisma.portfolio.create({
            data: {
                userId,
                name,
            },
        });
    }
    async getPortfolios(userId) {
        return this.prisma.portfolio.findMany({
            where: { userId },
            include: {
                holdings: {
                    include: {
                        fund: true,
                    },
                },
            },
        });
    }
    async getPortfolioValuation(portfolioId) {
        const portfolio = await this.prisma.portfolio.findUnique({
            where: { id: portfolioId },
            include: {
                holdings: {
                    include: {
                        fund: true,
                    },
                },
            },
        });
        if (!portfolio) {
            throw new common_1.NotFoundException(`Portfolio with ID ${portfolioId} not found`);
        }
        let totalInvested = 0;
        let totalCurrentValue = 0;
        const holdingsValuation = portfolio.holdings.map((holding) => {
            const invested = Number(holding.investedAmount);
            const units = Number(holding.units);
            const currentNav = Number(holding.fund.nav);
            const currentValue = units * currentNav;
            const profitLoss = currentValue - invested;
            const returnsPct = invested > 0 ? (profitLoss / invested) * 100 : 0;
            totalInvested += invested;
            totalCurrentValue += currentValue;
            return {
                holdingId: holding.id,
                fundId: holding.fundId,
                schemeName: holding.fund.schemeName,
                units,
                avgNav: Number(holding.avgNav),
                currentNav,
                investedAmount: invested,
                currentValue,
                profitLoss,
                returnsPct,
            };
        });
        const totalProfitLoss = totalCurrentValue - totalInvested;
        const absoluteReturnPct = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;
        const xirr = await this.calculatePortfolioXirr(portfolioId, totalCurrentValue);
        return {
            portfolioId,
            portfolioName: portfolio.name,
            totalInvested,
            totalCurrentValue,
            totalProfitLoss,
            absoluteReturnPct,
            xirrPct: xirr * 100,
            holdings: holdingsValuation,
        };
    }
    async calculatePortfolioXirr(portfolioId, currentValue) {
        const portfolio = await this.prisma.portfolio.findUnique({
            where: { id: portfolioId },
            include: { holdings: true },
        });
        if (!portfolio)
            return 0;
        const fundIds = portfolio.holdings.map((h) => h.fundId);
        if (fundIds.length === 0)
            return 0;
        const transactions = await this.prisma.transaction.findMany({
            where: {
                userId: portfolio.userId,
                fundId: { in: fundIds },
                status: 'COMPLETED',
            },
            orderBy: { date: 'asc' },
        });
        const cashFlows = transactions.map((tx) => ({
            amount: tx.type === 'BUY' || tx.type === 'SIP'
                ? -Number(tx.amount)
                : Number(tx.amount),
            date: new Date(tx.date),
        }));
        if (cashFlows.length === 0)
            return 0;
        cashFlows.push({
            amount: currentValue,
            date: new Date(),
        });
        return this.solveXirr(cashFlows);
    }
    solveXirr(cashFlows) {
        if (cashFlows.length < 2)
            return 0;
        const hasNegative = cashFlows.some((cf) => cf.amount < 0);
        const hasPositive = cashFlows.some((cf) => cf.amount > 0);
        if (!hasNegative || !hasPositive)
            return 0;
        const maxIterations = 100;
        const precision = 1e-6;
        let rate = 0.1;
        const d1 = cashFlows[0].date.getTime();
        for (let i = 0; i < maxIterations; i++) {
            let fValue = 0;
            let fDerivative = 0;
            for (const cf of cashFlows) {
                const t = (cf.date.getTime() - d1) / (365 * 24 * 60 * 60 * 1000);
                const exp = Math.pow(1 + rate, t);
                fValue += cf.amount / exp;
                fDerivative += (-t * cf.amount) / (exp * (1 + rate));
            }
            if (Math.abs(fDerivative) < 1e-12)
                break;
            const nextRate = rate - fValue / fDerivative;
            if (Math.abs(nextRate - rate) < precision) {
                return nextRate;
            }
            rate = nextRate;
        }
        return rate;
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map