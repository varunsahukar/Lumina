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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const cams_service_1 = require("./cams.service");
const kfintech_service_1 = require("./kfintech.service");
const prisma_1 = require("../generated/prisma");
let OrdersService = class OrdersService {
    prisma;
    camsService;
    kfintechService;
    constructor(prisma, camsService, kfintechService) {
        this.prisma = prisma;
        this.camsService = camsService;
        this.kfintechService = kfintechService;
    }
    async placeOrder(params) {
        const { userId, portfolioId, fundId, amount, type } = params;
        const portfolio = await this.getOrCreatePortfolio(userId, portfolioId);
        const fund = await this.prisma.fund.findUnique({
            where: { id: fundId },
        });
        if (!fund)
            throw new common_1.NotFoundException('Fund not found');
        if (amount <= 0) {
            throw new common_1.BadRequestException('Amount must be positive');
        }
        const currentNav = Number(fund.nav);
        if (currentNav <= 0) {
            throw new common_1.BadRequestException('Invalid fund NAV, cannot place order');
        }
        const isKfintech = fund.amcName.toLowerCase().includes('axis') ||
            fund.amcName.toLowerCase().includes('nippon') ||
            fund.amcName.toLowerCase().includes('uti');
        const rtaRequest = {
            schemeCode: fund.schemeCode,
            investorPan: 'ABCDE1234F',
            investorName: 'Test Investor',
            amount,
        };
        let rtaResult;
        if (type === prisma_1.TransactionType.BUY || type === prisma_1.TransactionType.SIP) {
            if (isKfintech) {
                rtaResult = await this.kfintechService.submitPurchaseOrder(rtaRequest);
            }
            else {
                rtaResult = await this.camsService.submitPurchaseOrder(rtaRequest);
            }
        }
        else if (type === prisma_1.TransactionType.SELL) {
            const holding = await this.prisma.holding.findFirst({
                where: { portfolioId: portfolio.id, fundId },
            });
            if (!holding || Number(holding.units) <= 0) {
                throw new common_1.BadRequestException('No holdings found for this fund to sell');
            }
            const unitsToSell = amount / currentNav;
            if (Number(holding.units) < unitsToSell) {
                throw new common_1.BadRequestException(`Insufficient units. Available: ${holding.units}, Requested: ${unitsToSell.toFixed(4)}`);
            }
            if (isKfintech) {
                rtaResult = await this.kfintechService.submitRedemptionOrder({
                    ...rtaRequest,
                    units: unitsToSell,
                });
            }
            else {
                rtaResult = await this.camsService.submitRedemptionOrder({
                    ...rtaRequest,
                    units: unitsToSell,
                });
            }
        }
        if (!rtaResult || !rtaResult.success) {
            throw new common_1.BadRequestException('Transaction rejected by RTA');
        }
        const allocatedUnits = rtaResult.allocatedUnits || amount / currentNav;
        const tx = await this.prisma.transaction.create({
            data: {
                userId,
                fundId,
                type,
                amount,
                units: allocatedUnits,
                nav: currentNav,
                date: new Date(),
                status: prisma_1.TransactionStatus.COMPLETED,
            },
        });
        const existingHolding = await this.prisma.holding.findFirst({
            where: { portfolioId: portfolio.id, fundId },
        });
        if (type === prisma_1.TransactionType.BUY || type === prisma_1.TransactionType.SIP) {
            if (existingHolding) {
                const oldUnits = Number(existingHolding.units);
                const oldInvested = Number(existingHolding.investedAmount);
                const newUnits = oldUnits + allocatedUnits;
                const newInvested = oldInvested + amount;
                const avgNav = newInvested / newUnits;
                await this.prisma.holding.update({
                    where: { id: existingHolding.id },
                    data: {
                        units: newUnits,
                        investedAmount: newInvested,
                        avgNav,
                    },
                });
            }
            else {
                await this.prisma.holding.create({
                    data: {
                        portfolioId: portfolio.id,
                        fundId,
                        units: allocatedUnits,
                        investedAmount: amount,
                        avgNav: currentNav,
                    },
                });
            }
        }
        else if (type === prisma_1.TransactionType.SELL) {
            if (existingHolding) {
                const oldUnits = Number(existingHolding.units);
                const oldInvested = Number(existingHolding.investedAmount);
                const newUnits = Math.max(0, oldUnits - allocatedUnits);
                const ratio = oldUnits > 0 ? newUnits / oldUnits : 0;
                const newInvested = oldInvested * ratio;
                if (newUnits === 0) {
                    await this.prisma.holding.delete({
                        where: { id: existingHolding.id },
                    });
                }
                else {
                    await this.prisma.holding.update({
                        where: { id: existingHolding.id },
                        data: {
                            units: newUnits,
                            investedAmount: newInvested,
                        },
                    });
                }
            }
        }
        return {
            transactionId: tx.id,
            status: tx.status,
            unitsAllocated: allocatedUnits,
            referenceNumber: rtaResult.referenceNumber,
            remarks: rtaResult.remarks,
        };
    }
    async getOrCreatePortfolio(userId, portfolioId) {
        if (portfolioId) {
            const portfolio = await this.prisma.portfolio.findFirst({
                where: { id: portfolioId, userId },
            });
            if (!portfolio)
                throw new common_1.NotFoundException('Portfolio not found');
            return portfolio;
        }
        const existingPortfolio = await this.prisma.portfolio.findFirst({
            where: { userId },
            orderBy: { createdAt: 'asc' },
        });
        if (existingPortfolio) {
            return existingPortfolio;
        }
        return this.prisma.portfolio.create({
            data: {
                userId,
                name: 'Core Portfolio',
            },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cams_service_1.CamsService,
        kfintech_service_1.KfintechService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map