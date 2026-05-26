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
var BseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BseService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
let BseService = BseService_1 = class BseService {
    httpService;
    configService;
    logger = new common_1.Logger(BseService_1.name);
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async getStockQuote(securityId) {
        if (!securityId)
            throw new common_1.BadRequestException('Security ID or Symbol is required');
        const cleanId = securityId.toUpperCase().trim();
        try {
            const mockPrices = {
                '500325': 2450.0,
                '532540': 3822.0,
                '500180': 1612.0,
            };
            const basePrice = mockPrices[cleanId] || 250.0;
            const variation = (Math.random() - 0.5) * 8;
            const lastPrice = parseFloat((basePrice + variation).toFixed(2));
            return {
                securityId: cleanId,
                scripName: `${cleanId} BSE Scrip`,
                lastPrice,
                change: parseFloat(variation.toFixed(2)),
                pChange: parseFloat(((variation / basePrice) * 100).toFixed(2)),
                open: basePrice,
                high: lastPrice + 2,
                low: lastPrice - 2,
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            this.logger.error(`BSE price fetch error for ${cleanId}: ${error.message}`);
            throw new common_1.BadRequestException(`BSE Integration failure: ${error.message}`);
        }
    }
    async getSensexIndex() {
        const baseValue = 72000.0;
        const variation = (Math.random() - 0.4) * 200;
        const value = parseFloat((baseValue + variation).toFixed(2));
        return {
            indexName: 'SENSEX',
            value,
            change: parseFloat(variation.toFixed(2)),
            pChange: parseFloat(((variation / baseValue) * 100).toFixed(2)),
            timestamp: new Date().toISOString(),
        };
    }
};
exports.BseService = BseService;
exports.BseService = BseService = BseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], BseService);
//# sourceMappingURL=bse.service.js.map