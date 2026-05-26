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
var NseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NseService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
let NseService = NseService_1 = class NseService {
    httpService;
    configService;
    logger = new common_1.Logger(NseService_1.name);
    apiBaseUrl;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.apiBaseUrl =
            this.configService.get('NSE_API_BASE_URL') ||
                'https://www.nseindia.com/api';
    }
    async getStockQuote(symbol) {
        if (!symbol)
            throw new common_1.BadRequestException('Symbol must be specified');
        const cleanSymbol = symbol.toUpperCase().trim();
        try {
            const mockPrices = {
                RELIANCE: 2450.5,
                TCS: 3820.15,
                INFY: 1420.8,
                HDFCBANK: 1610.4,
                ICICIBANK: 980.2,
            };
            const basePrice = mockPrices[cleanSymbol] || 150.0;
            const variation = (Math.random() - 0.5) * 10;
            const currentPrice = parseFloat((basePrice + variation).toFixed(2));
            const change = parseFloat(variation.toFixed(2));
            const pChange = parseFloat(((change / basePrice) * 100).toFixed(2));
            return {
                symbol: cleanSymbol,
                companyName: `${cleanSymbol} Industries Ltd`,
                lastPrice: currentPrice,
                change,
                pChange,
                open: basePrice,
                dayHigh: parseFloat((currentPrice + Math.random() * 5).toFixed(2)),
                dayLow: parseFloat((currentPrice - Math.random() * 5).toFixed(2)),
                volume: Math.floor(Math.random() * 1000000) + 50000,
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            this.logger.error(`Failed to fetch NSE stock quote for ${cleanSymbol}: ${error.message}`);
            throw new common_1.BadRequestException(`Unable to fetch NSE quote: ${error.message}`);
        }
    }
};
exports.NseService = NseService;
exports.NseService = NseService = NseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], NseService);
//# sourceMappingURL=nse.service.js.map