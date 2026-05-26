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
exports.FundsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let FundsService = class FundsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(params) {
        const { skip, take, category, search } = params;
        const where = { isActive: true };
        if (category) {
            where.category = { equals: category, mode: 'insensitive' };
        }
        if (search) {
            where.OR = [
                { schemeName: { contains: search, mode: 'insensitive' } },
                { amcName: { contains: search, mode: 'insensitive' } },
                { schemeCode: { contains: search } },
            ];
        }
        const [items, total] = await Promise.all([
            this.prisma.fund.findMany({
                where,
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined,
                orderBy: { schemeName: 'asc' },
            }),
            this.prisma.fund.count({ where }),
        ]);
        return { items, total };
    }
    async findOne(id) {
        const fund = await this.prisma.fund.findUnique({
            where: { id },
            include: {
                navHistory: {
                    orderBy: { date: 'desc' },
                    take: 30,
                },
            },
        });
        if (!fund) {
            throw new common_1.NotFoundException(`Fund with ID ${id} not found`);
        }
        return fund;
    }
    async getNavHistory(id, limit = 365) {
        const fund = await this.prisma.fund.findUnique({ where: { id } });
        if (!fund)
            throw new common_1.NotFoundException(`Fund with ID ${id} not found`);
        return this.prisma.navHistory.findMany({
            where: { fundId: id },
            orderBy: { date: 'asc' },
            take: Number(limit),
        });
    }
    async getCategories() {
        const categories = await this.prisma.fund.findMany({
            select: { category: true },
            distinct: ['category'],
        });
        return categories.map((c) => c.category);
    }
};
exports.FundsService = FundsService;
exports.FundsService = FundsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FundsService);
//# sourceMappingURL=funds.service.js.map