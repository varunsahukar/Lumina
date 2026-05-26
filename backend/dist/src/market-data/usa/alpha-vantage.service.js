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
var AlphaVantageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaVantageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AlphaVantageService = AlphaVantageService_1 = class AlphaVantageService {
    httpService;
    configService;
    logger = new common_1.Logger(AlphaVantageService_1.name);
    apiKey;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.apiKey =
            this.configService.get('ALPHA_VANTAGE_API_KEY') || 'demo';
    }
    async getExchangeRate(fromCurrency, toCurrency) {
        const from = fromCurrency.toUpperCase().trim();
        const to = toCurrency.toUpperCase().trim();
        if (this.apiKey === 'demo') {
            const mockRates = {
                USD_INR: 83.5,
                EUR_USD: 1.09,
                GBP_USD: 1.27,
            };
            const key = `${from}_${to}`;
            return {
                fromCurrency: from,
                toCurrency: to,
                exchangeRate: mockRates[key] || 1.0,
                lastUpdated: new Date().toISOString(),
            };
        }
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${this.apiKey}`));
            const data = response.data['Realtime Currency Exchange Rate'];
            if (!data) {
                throw new common_1.BadRequestException('Failed to get exchange rate from Alpha Vantage');
            }
            return {
                fromCurrency: data['1. From_Currency Code'],
                toCurrency: data['3. To_Currency Code'],
                exchangeRate: parseFloat(data['5. Exchange Rate']),
                lastUpdated: data['6. Last Refreshed'],
            };
        }
        catch (error) {
            this.logger.error(`Alpha Vantage FX Rate request failed: ${error.message}`);
            throw error;
        }
    }
    async getDailyTimeSeries(symbol) {
        const cleanSymbol = symbol.toUpperCase().trim();
        if (this.apiKey === 'demo') {
            return {
                symbol: cleanSymbol,
                timeSeries: [
                    { date: new Date().toISOString().split('T')[0], close: 150.0 },
                    {
                        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
                        close: 148.5,
                    },
                ],
            };
        }
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${cleanSymbol}&apikey=${this.apiKey}`));
            const timeSeries = response.data['Time Series (Daily)'];
            if (!timeSeries) {
                throw new common_1.BadRequestException('Failed to get daily time series from Alpha Vantage');
            }
            const formatted = Object.keys(timeSeries)
                .slice(0, 30)
                .map((date) => ({
                date,
                close: parseFloat(timeSeries[date]['4. close']),
                open: parseFloat(timeSeries[date]['1. open']),
                high: parseFloat(timeSeries[date]['2. high']),
                low: parseFloat(timeSeries[date]['3. low']),
                volume: parseInt(timeSeries[date]['5. volume']),
            }));
            return {
                symbol: cleanSymbol,
                timeSeries: formatted,
            };
        }
        catch (error) {
            this.logger.error(`Alpha Vantage Daily Time Series failed: ${error.message}`);
            throw error;
        }
    }
};
exports.AlphaVantageService = AlphaVantageService;
exports.AlphaVantageService = AlphaVantageService = AlphaVantageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AlphaVantageService);
//# sourceMappingURL=alpha-vantage.service.js.map