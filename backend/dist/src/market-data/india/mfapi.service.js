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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MfApiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const p_limit_1 = __importDefault(require("p-limit"));
const rxjs_1 = require("rxjs");
let MfApiService = MfApiService_1 = class MfApiService {
    httpService;
    configService;
    logger = new common_1.Logger(MfApiService_1.name);
    baseUrl;
    lastBulkErrors = [];
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.baseUrl =
            this.configService.get('MFAPI_BASE_URL') ||
                'https://api.mfapi.in/mf';
    }
    async fetchFundMeta(schemeCode) {
        const fund = await this.fetchFundData(schemeCode);
        return fund.meta;
    }
    async fetchFundHistory(schemeCode, days) {
        const fund = await this.fetchFundData(schemeCode);
        return fund.history.slice(0, Math.max(1, Number(days) || 30));
    }
    async fetchAllSchemeCodes() {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.baseUrl, { timeout: 10000 }));
        return response.data
            .filter((scheme) => scheme.schemeCode && scheme.schemeName)
            .map((scheme) => ({
            schemeCode: String(scheme.schemeCode),
            schemeName: scheme.schemeName,
        }));
    }
    async bulkFetchFunds(codes) {
        this.lastBulkErrors = [];
        const concurrency = Number(this.configService.get('INDIA_SYNC_CONCURRENCY')) || 5;
        const limit = (0, p_limit_1.default)(Math.max(1, concurrency));
        const uniqueCodes = [...new Set(codes.map((code) => code.trim()))].filter(Boolean);
        const settled = await Promise.allSettled(uniqueCodes.map((code) => limit(async () => this.fetchFundDataWithRetry(code))));
        const funds = [];
        settled.forEach((result, index) => {
            const schemeCode = uniqueCodes[index];
            if (result.status === 'fulfilled') {
                funds.push(result.value);
                return;
            }
            const message = `${schemeCode}: ${result.reason?.message || result.reason}`;
            this.lastBulkErrors.push(message);
            this.logger.warn(`mfapi.in sync skipped ${message}`);
        });
        return funds;
    }
    getLastBulkErrors() {
        return [...this.lastBulkErrors];
    }
    async fetchFundDataWithRetry(schemeCode) {
        try {
            return await this.fetchFundData(schemeCode);
        }
        catch (error) {
            this.logger.warn(`mfapi.in request failed for ${schemeCode}; retrying once in 1s`);
            await this.sleep(1000);
            return this.fetchFundData(schemeCode);
        }
    }
    async fetchFundData(schemeCode) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/${encodeURIComponent(schemeCode)}`, { timeout: 10000 }));
        const payload = response.data;
        if (!payload?.meta || !Array.isArray(payload.data)) {
            throw new Error('Unexpected mfapi.in response shape');
        }
        const history = payload.data
            .map((row) => this.toNavPoint(row))
            .filter((point) => Boolean(point));
        if (history.length === 0) {
            throw new Error('No numeric NAV history returned');
        }
        const latestNav = history[0]?.nav;
        const previousNav = history[1]?.nav;
        const changePercent = latestNav !== undefined && previousNav
            ? ((latestNav - previousNav) / previousNav) * 100
            : undefined;
        return {
            meta: {
                fundHouse: payload.meta.fund_house || '',
                schemeType: payload.meta.scheme_type || '',
                schemeCategory: payload.meta.scheme_category || 'Equity',
                schemeCode: String(payload.meta.scheme_code || schemeCode),
                schemeName: payload.meta.scheme_name || schemeCode,
            },
            history,
            latestNav,
            previousNav,
            changePercent,
        };
    }
    toNavPoint(row) {
        const nav = Number.parseFloat(row.nav);
        if (!Number.isFinite(nav))
            return null;
        const date = this.parseMfApiDate(row.date);
        if (!date)
            return null;
        return { date, nav };
    }
    parseMfApiDate(value) {
        const [day, month, year] = value.split('-').map(Number);
        if (!day || !month || !year)
            return null;
        return new Date(Date.UTC(year, month - 1, day));
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};
exports.MfApiService = MfApiService;
exports.MfApiService = MfApiService = MfApiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], MfApiService);
//# sourceMappingURL=mfapi.service.js.map