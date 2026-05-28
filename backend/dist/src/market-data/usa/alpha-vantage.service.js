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
exports.AlphaVantageService = exports.ConfigException = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const rxjs_1 = require("rxjs");
const prisma_service_1 = require("../../common/prisma.service");
const redis_service_1 = require("../../common/redis.service");
const funds_service_1 = require("../../funds/funds.service");
const market_data_types_1 = require("../market-data.types");
class ConfigException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConfigException';
    }
}
exports.ConfigException = ConfigException;
let AlphaVantageService = AlphaVantageService_1 = class AlphaVantageService {
    httpService;
    configService;
    redisService;
    fundsService;
    prisma;
    logger = new common_1.Logger(AlphaVantageService_1.name);
    apiKey;
    baseUrl;
    lastFetchErrors = [];
    constructor(httpService, configService, redisService, fundsService, prisma) {
        this.httpService = httpService;
        this.configService = configService;
        this.redisService = redisService;
        this.fundsService = fundsService;
        this.prisma = prisma;
        this.apiKey =
            this.configService.get('ALPHA_VANTAGE_KEY') ||
                this.configService.get('ALPHA_VANTAGE_API_KEY') ||
                '';
        this.baseUrl =
            this.configService.get('ALPHA_VANTAGE_BASE_URL') ||
                'https://www.alphavantage.co/query';
    }
    async fetchQuote(symbol) {
        return this.fetchQuoteWithRetry(symbol.toUpperCase().trim(), true);
    }
    async fetchAllQuotes() {
        this.lastFetchErrors = [];
        const tickers = this.getUsaTickers();
        const intervalMs = Number(this.configService.get('USA_SYNC_INTERVAL_MS')) || 12000;
        const quotes = [];
        for (let index = 0; index < tickers.length; index++) {
            if (index > 0) {
                await this.sleep(intervalMs);
            }
            const symbol = tickers[index];
            try {
                quotes.push(await this.fetchQuote(symbol));
            }
            catch (error) {
                if (error instanceof ConfigException) {
                    throw error;
                }
                const message = `${symbol}: ${this.getErrorMessage(error)}`;
                this.lastFetchErrors.push(message);
                this.logger.warn(`Alpha Vantage quote skipped ${message}`);
            }
        }
        return quotes;
    }
    async syncUsaFunds() {
        const startedAt = Date.now();
        try {
            const quotes = await this.fetchAllQuotes();
            await this.fundsService.upsertUsaFunds(quotes);
            await this.prisma.syncLog.create({
                data: {
                    source: 'ALPHA_VANTAGE',
                    status: this.lastFetchErrors.length ? 'PARTIAL' : 'SUCCESS',
                    fundsSync: quotes.length,
                    errors: this.lastFetchErrors,
                    duration: Date.now() - startedAt,
                },
            });
            this.logger.log(`USA fund sync completed for ${quotes.length} quotes`);
        }
        catch (error) {
            const message = this.getErrorMessage(error);
            this.logger.error(`Alpha Vantage sync stopped: ${message}`);
            await this.prisma.syncLog.create({
                data: {
                    source: 'ALPHA_VANTAGE',
                    status: 'FAILED',
                    fundsSync: 0,
                    errors: [message],
                    duration: Date.now() - startedAt,
                },
            });
        }
    }
    getLastFetchErrors() {
        return [...this.lastFetchErrors];
    }
    async getExchangeRate(fromCurrency, toCurrency) {
        const from = fromCurrency.toUpperCase().trim();
        const to = toCurrency.toUpperCase().trim();
        if (!this.apiKey || this.apiKey === 'demo') {
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
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.baseUrl, {
            params: {
                function: 'CURRENCY_EXCHANGE_RATE',
                from_currency: from,
                to_currency: to,
                apikey: this.apiKey,
            },
            timeout: 10000,
        }));
        const data = response.data['Realtime Currency Exchange Rate'];
        if (!data) {
            throw new common_1.BadRequestException('Failed to get exchange rate from Alpha Vantage');
        }
        return {
            fromCurrency: data['1. From_Currency Code'],
            toCurrency: data['3. To_Currency Code'],
            exchangeRate: Number.parseFloat(data['5. Exchange Rate']),
            lastUpdated: data['6. Last Refreshed'],
        };
    }
    async getDailyTimeSeries(symbol) {
        const cleanSymbol = symbol.toUpperCase().trim();
        if (!this.apiKey || this.apiKey === 'demo') {
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
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.baseUrl, {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol: cleanSymbol,
                apikey: this.apiKey,
            },
            timeout: 10000,
        }));
        const timeSeries = response.data['Time Series (Daily)'];
        if (!timeSeries) {
            throw new common_1.BadRequestException('Failed to get daily time series from Alpha Vantage');
        }
        return {
            symbol: cleanSymbol,
            timeSeries: Object.keys(timeSeries)
                .slice(0, 30)
                .map((date) => ({
                date,
                close: Number.parseFloat(timeSeries[date]['4. close']),
                open: Number.parseFloat(timeSeries[date]['1. open']),
                high: Number.parseFloat(timeSeries[date]['2. high']),
                low: Number.parseFloat(timeSeries[date]['3. low']),
                volume: Number.parseInt(timeSeries[date]['5. volume'], 10),
            })),
        };
    }
    async fetchQuoteWithRetry(symbol, retryOnRateLimit) {
        this.assertApiKey();
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.baseUrl, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol,
                apikey: this.apiKey,
            },
            timeout: 10000,
            validateStatus: () => true,
        }));
        if (response.status === 429 || response.data?.Note) {
            await this.handleRateLimit(symbol);
            if (!retryOnRateLimit) {
                throw new Error('Alpha Vantage rate limit persisted after retry');
            }
            await this.sleep(60000);
            return this.fetchQuoteWithRetry(symbol, false);
        }
        if (response.data?.Information) {
            throw new ConfigException(`Alpha Vantage configuration error: ${response.data.Information}`);
        }
        const quote = response.data?.['Global Quote'];
        if (!quote) {
            throw new Error('Missing Global Quote payload');
        }
        const price = Number.parseFloat(quote['05. price'] || '');
        const change = Number.parseFloat(quote['09. change'] || '0');
        const changePercent = Number.parseFloat((quote['10. change percent'] || '0').replace('%', ''));
        const latestTradingDay = this.parseUsTradingDate(quote['07. latest trading day'] || '');
        if (!Number.isFinite(price) || !latestTradingDay) {
            throw new Error('Invalid Alpha Vantage quote values');
        }
        return {
            symbol: quote['01. symbol'] || symbol,
            name: market_data_types_1.USA_FUND_NAMES[symbol] || symbol,
            price,
            change: Number.isFinite(change) ? change : 0,
            changePercent: Number.isFinite(changePercent) ? changePercent : 0,
            latestTradingDay,
            currency: 'USD',
        };
    }
    assertApiKey() {
        if (!this.apiKey || this.apiKey === 'your_key_here') {
            throw new ConfigException('ALPHA_VANTAGE_KEY is not configured');
        }
    }
    async handleRateLimit(symbol) {
        this.logger.warn(`Alpha Vantage rate limit hit while fetching ${symbol}`);
        await this.redisService.set('alpha_vantage:rate_limit', symbol, 60);
    }
    parseUsTradingDate(value) {
        if (!value)
            return null;
        const parsed = Date.parse(`${value}T00:00:00Z`);
        if (Number.isNaN(parsed))
            return null;
        return new Date(parsed);
    }
    getUsaTickers() {
        const configured = this.configService.get('USA_TICKERS');
        if (!configured)
            return market_data_types_1.DEFAULT_USA_TICKERS;
        return configured
            .split(',')
            .map((ticker) => ticker.trim().toUpperCase())
            .filter(Boolean);
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    getErrorMessage(error) {
        return error instanceof Error ? error.message : String(error);
    }
};
exports.AlphaVantageService = AlphaVantageService;
__decorate([
    (0, schedule_1.Cron)(process.env.USA_SYNC_CRON || '0 */4 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlphaVantageService.prototype, "syncUsaFunds", null);
exports.AlphaVantageService = AlphaVantageService = AlphaVantageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        redis_service_1.RedisService,
        funds_service_1.FundsService,
        prisma_service_1.PrismaService])
], AlphaVantageService);
//# sourceMappingURL=alpha-vantage.service.js.map