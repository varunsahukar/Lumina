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
var FinnhubService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinnhubService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const ws_1 = __importDefault(require("ws"));
let FinnhubService = FinnhubService_1 = class FinnhubService {
    httpService;
    configService;
    logger = new common_1.Logger(FinnhubService_1.name);
    apiKey;
    wsUrl;
    ws = null;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.apiKey =
            this.configService.get('FINNHUB_API_KEY') || 'mock-finnhub-key';
        this.wsUrl = `wss://ws.finnhub.io?token=${this.apiKey}`;
    }
    onModuleInit() {
        if (this.apiKey !== 'mock-finnhub-key') {
            this.connectWebSocket();
        }
        else {
            this.logger.log('Finnhub API Key is mock. WebSocket connection skipped.');
        }
    }
    onModuleDestroy() {
        this.ws?.close();
    }
    connectWebSocket() {
        try {
            const ws = new ws_1.default(this.wsUrl);
            this.ws = ws;
            ws.on('open', () => {
                this.logger.log('Connected to Finnhub WebSocket server');
                ws.send(JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' }));
                ws.send(JSON.stringify({ type: 'subscribe', symbol: 'AAPL' }));
            });
            ws.on('message', (data) => {
                try {
                    const parsed = JSON.parse(data.toString());
                    if (parsed.type === 'trade') {
                        this.logger.debug(`Real-time trade parsed: ${JSON.stringify(parsed.data)}`);
                    }
                }
                catch (e) {
                    this.logger.error(`Error parsing Finnhub WebSocket packet: ${e.message}`);
                }
            });
            ws.on('error', (err) => {
                this.logger.error(`Finnhub WebSocket error: ${err.message}`);
            });
            ws.on('close', () => {
                this.logger.log('Finnhub WebSocket connection closed. Reconnecting in 10s...');
                setTimeout(() => this.connectWebSocket(), 10000);
            });
        }
        catch (error) {
            this.logger.error(`Failed to initiate Finnhub WebSocket: ${error.message}`);
        }
    }
    async getUsStockQuote(symbol) {
        const cleanSymbol = symbol.toUpperCase().trim();
        if (this.apiKey === 'mock-finnhub-key') {
            return {
                symbol: cleanSymbol,
                currentPrice: 180.5 + Math.random() * 5,
                highPrice: 183.0,
                lowPrice: 179.2,
                openPrice: 180.1,
                previousClosePrice: 179.8,
                timestamp: Math.floor(Date.now() / 1000),
            };
        }
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://finnhub.io/api/v1/quote?symbol=${cleanSymbol}&token=${this.apiKey}`));
            const data = response.data;
            return {
                symbol: cleanSymbol,
                currentPrice: data.c,
                highPrice: data.h,
                lowPrice: data.l,
                openPrice: data.o,
                previousClosePrice: data.pc,
                timestamp: data.t,
            };
        }
        catch (error) {
            this.logger.error(`Finnhub HTTP API request failed for ${cleanSymbol}: ${error.message}`);
            throw error;
        }
    }
};
exports.FinnhubService = FinnhubService;
exports.FinnhubService = FinnhubService = FinnhubService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], FinnhubService);
//# sourceMappingURL=finnhub.service.js.map