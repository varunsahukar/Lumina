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
var NewsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let NewsService = NewsService_1 = class NewsService {
    httpService;
    logger = new common_1.Logger(NewsService_1.name);
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getLatestNews() {
        try {
            return [
                {
                    title: 'SEBI mandates strict stress test disclosures for Small & Mid Cap mutual funds',
                    source: 'Economic Times',
                    url: 'https://economictimes.indiatimes.com/mf/sebi-midcap-stress-test',
                    publishedAt: new Date().toISOString(),
                    summary: 'The securities regulator has asked mutual funds to reveal liquidity days, concentration metrics, and portfolio volatility outcomes every fortnight.',
                },
                {
                    title: 'Nifty 50 achieves historic milestones amid tech rally and robust domestic inflows',
                    source: 'LiveMint',
                    url: 'https://livemint.com/market/nifty-50-all-time-highs',
                    publishedAt: new Date(Date.now() - 3600000).toISOString(),
                    summary: 'Strong buying by local mutual funds offsets FII outflows as index weights shift towards digital conglomerates.',
                },
                {
                    title: 'US Bond Yields retract from peaks as inflation forecasts align with targets',
                    source: 'Bloomberg',
                    url: 'https://bloomberg.com/markets/bonds',
                    publishedAt: new Date(Date.now() - 7200000).toISOString(),
                    summary: 'Fixed-income managers recommend extending duration as macroeconomic datasets hint at minor rate adjustments.',
                },
            ];
        }
        catch (error) {
            this.logger.error(`Failed to fetch news: ${error.message}`);
            return [];
        }
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = NewsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], NewsService);
//# sourceMappingURL=news.service.js.map