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
var AmfiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmfiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AmfiService = AmfiService_1 = class AmfiService {
    prisma;
    httpService;
    logger = new common_1.Logger(AmfiService_1.name);
    amfiUrl = 'https://www.amfiindia.com/spages/NAVAll.txt';
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
    }
    async fetchAndSyncNavs() {
        this.logger.log('Downloading AMFI NAV records...');
        let dataText;
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.amfiUrl, { responseType: 'text' }));
            dataText = response.data;
        }
        catch (error) {
            this.logger.error(`Failed to fetch AMFI data: ${error.message}`);
            throw error;
        }
        const lines = dataText.split('\n');
        let totalProcessed = 0;
        let updated = 0;
        this.logger.log(`Parsing ${lines.length} lines of AMFI data...`);
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed)
                continue;
            const parts = trimmed.split(';');
            if (parts.length < 6)
                continue;
            const schemeCode = parts[0].trim();
            const schemeName = parts[3]?.trim();
            const navStr = parts[4]?.trim();
            const dateStr = parts[5]?.trim();
            if (isNaN(Number(schemeCode)) || !schemeCode)
                continue;
            const nav = parseFloat(navStr);
            if (isNaN(nav))
                continue;
            totalProcessed++;
            try {
                let navDate = new Date();
                if (dateStr) {
                    const parsedDate = Date.parse(dateStr);
                    if (!isNaN(parsedDate)) {
                        navDate = new Date(parsedDate);
                    }
                }
                const existingFund = await this.prisma.fund.findUnique({
                    where: { schemeCode },
                });
                if (existingFund) {
                    await this.prisma.fund.update({
                        where: { id: existingFund.id },
                        data: {
                            nav,
                            updatedAt: new Date(),
                        },
                    });
                    await this.prisma.navHistory.upsert({
                        where: {
                            fundId_date: {
                                fundId: existingFund.id,
                                date: navDate,
                            },
                        },
                        update: { nav },
                        create: {
                            fundId: existingFund.id,
                            nav,
                            date: navDate,
                        },
                    });
                    updated++;
                }
                else {
                    const amcName = schemeName.split(' ')[0] || 'Unknown';
                    const newFund = await this.prisma.fund.create({
                        data: {
                            schemeCode,
                            schemeName,
                            amcName,
                            category: 'Mutual Fund',
                            subCategory: 'Equity/Debt',
                            nav,
                            isActive: true,
                        },
                    });
                    await this.prisma.navHistory.create({
                        data: {
                            fundId: newFund.id,
                            nav,
                            date: navDate,
                        },
                    });
                    updated++;
                }
            }
            catch (err) {
                this.logger.debug(`Failed to sync scheme ${schemeCode}: ${err.message}`);
            }
        }
        this.logger.log(`Sync completed. Processed ${totalProcessed} funds, synced ${updated} records.`);
        return { totalProcessed, updated };
    }
};
exports.AmfiService = AmfiService;
exports.AmfiService = AmfiService = AmfiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService])
], AmfiService);
//# sourceMappingURL=amfi.service.js.map