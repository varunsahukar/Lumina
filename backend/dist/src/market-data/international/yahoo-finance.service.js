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
var YahooFinanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.YahooFinanceService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let YahooFinanceService = YahooFinanceService_1 = class YahooFinanceService {
    httpService;
    configService;
    logger = new common_1.Logger(YahooFinanceService_1.name);
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async getGlobalIndex(symbol) {
        const cleanSymbol = symbol.trim();
        try {
            if (this.isYahooFinanceEnabled()) {
                return this.fetchRapidApiQuote(cleanSymbol);
            }
            const mockValues = {
                '^GSPC': 5100.5,
                '^IXIC': 16120.3,
                '^DJI': 39130.0,
                '^N225': 38900.2,
            };
            const baseVal = mockValues[cleanSymbol] || 4500.0;
            const variation = (Math.random() - 0.45) * 45;
            const price = parseFloat((baseVal + variation).toFixed(2));
            return {
                symbol: cleanSymbol,
                indexName: this.getIndexNameBySymbol(cleanSymbol),
                price,
                change: parseFloat(variation.toFixed(2)),
                pChange: parseFloat(((variation / baseVal) * 100).toFixed(2)),
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            this.logger.error(`Yahoo Finance fetch failed for index ${cleanSymbol}: ${error.message}`);
            throw new common_1.BadRequestException(`Yahoo Finance index quote unavailable: ${error.message}`);
        }
    }
    async fetchRapidApiQuote(symbol) {
        const apiKey = this.configService.get('RAPIDAPI_KEY');
        if (!apiKey) {
            throw new common_1.BadRequestException('RAPIDAPI_KEY is required');
        }
        const host = this.configService.get('YAHOO_FINANCE_RAPIDAPI_HOST') ||
            'yahoo-finance15.p.rapidapi.com';
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://${host}/api/v1/markets/stock/quotes`, {
            params: { ticker: symbol },
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': host,
            },
            timeout: 10000,
        }));
        return response.data;
    }
    isYahooFinanceEnabled() {
        return (this.configService.get('ENABLE_YAHOO_FINANCE')?.toLowerCase() ===
            'true');
    }
    getIndexNameBySymbol(symbol) {
        switch (symbol) {
            case '^GSPC':
                return 'S&P 500';
            case '^IXIC':
                return 'NASDAQ';
            case '^DJI':
                return 'Dow Jones';
            case '^N225':
                return 'Nikkei 225';
            default:
                return 'Global Index';
        }
    }
};
exports.YahooFinanceService = YahooFinanceService;
exports.YahooFinanceService = YahooFinanceService = YahooFinanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], YahooFinanceService);
//# sourceMappingURL=yahoo-finance.service.js.map