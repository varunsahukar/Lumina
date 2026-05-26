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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PriceGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let PriceGateway = PriceGateway_1 = class PriceGateway {
    logger = new common_1.Logger(PriceGateway_1.name);
    subscriptions = new Map();
    intervalId = null;
    server;
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
        this.subscriptions.set(client.id, new Set());
        if (!this.intervalId) {
            this.startPriceBroadcastLoop();
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.subscriptions.delete(client.id);
        if (this.subscriptions.size === 0 && this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    handleSubscribe(data, client) {
        const symbol = data.symbol.toUpperCase();
        this.logger.log(`Client ${client.id} subscribed to: ${symbol}`);
        const clientSubs = this.subscriptions.get(client.id) || new Set();
        clientSubs.add(symbol);
        this.subscriptions.set(client.id, clientSubs);
        client.join(symbol);
        return { status: 'subscribed', symbol };
    }
    handleUnsubscribe(data, client) {
        const symbol = data.symbol.toUpperCase();
        this.logger.log(`Client ${client.id} unsubscribed from: ${symbol}`);
        const clientSubs = this.subscriptions.get(client.id);
        if (clientSubs) {
            clientSubs.delete(symbol);
        }
        client.leave(symbol);
        return { status: 'unsubscribed', symbol };
    }
    startPriceBroadcastLoop() {
        this.intervalId = setInterval(() => {
            const allSymbols = new Set();
            this.subscriptions.forEach((symbols) => {
                symbols.forEach((s) => allSymbols.add(s));
            });
            allSymbols.forEach((symbol) => {
                const tick = this.generatePriceTick(symbol);
                this.server.to(symbol).emit('priceTick', tick);
            });
        }, 2000);
    }
    generatePriceTick(symbol) {
        const basePrices = {
            AAPL: 185.0,
            MSFT: 420.0,
            RELIANCE: 2450.0,
            TCS: 3820.0,
            SENSEX: 72000.0,
            NIFTY: 22000.0,
        };
        const basePrice = basePrices[symbol] || 100.0;
        const change = (Math.random() - 0.5) * (basePrice * 0.005);
        const price = parseFloat((basePrice + change).toFixed(2));
        const percentChange = parseFloat(((change / basePrice) * 100).toFixed(2));
        return {
            symbol,
            price,
            change: parseFloat(change.toFixed(2)),
            percentChange,
            timestamp: new Date().toISOString(),
        };
    }
};
exports.PriceGateway = PriceGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PriceGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribe'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], PriceGateway.prototype, "handleSubscribe", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('unsubscribe'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], PriceGateway.prototype, "handleUnsubscribe", null);
exports.PriceGateway = PriceGateway = PriceGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        namespace: 'prices',
    }),
    (0, common_1.Injectable)()
], PriceGateway);
//# sourceMappingURL=price.gateway.js.map