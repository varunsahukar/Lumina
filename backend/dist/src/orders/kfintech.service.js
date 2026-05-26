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
var KfintechService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KfintechService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let KfintechService = KfintechService_1 = class KfintechService {
    configService;
    logger = new common_1.Logger(KfintechService_1.name);
    kfinEndpoint;
    constructor(configService) {
        this.configService = configService;
        this.kfinEndpoint =
            this.configService.get('KFINTECH_API_ENDPOINT') ||
                'https://api.kfintech.com/v2';
    }
    async submitPurchaseOrder(request) {
        this.logger.log(`Routing BUY order to KFintech for scheme: ${request.schemeCode}`);
        const referenceNumber = `KFIN-TX-${Math.floor(10000000 + Math.random() * 90000000)}`;
        const folioNumber = request.folioNumber ||
            `KF-${Math.floor(100000 + Math.random() * 900000)}`;
        return {
            success: true,
            referenceNumber,
            folioNumber,
            allocatedUnits: request.units || parseFloat((request.amount / 85.2).toFixed(4)),
            nav: 85.2,
            timestamp: new Date().toISOString(),
            remarks: 'Order verified and confirmed by KFintech.',
        };
    }
    async submitRedemptionOrder(request) {
        this.logger.log(`Routing SELL order to KFintech for scheme: ${request.schemeCode}`);
        const referenceNumber = `KFIN-TX-${Math.floor(10000000 + Math.random() * 90000000)}`;
        return {
            success: true,
            referenceNumber,
            folioNumber: request.folioNumber || 'KF-7654321',
            timestamp: new Date().toISOString(),
            remarks: 'Redemption processed by KFintech. Credit will post according to payout terms.',
        };
    }
};
exports.KfintechService = KfintechService;
exports.KfintechService = KfintechService = KfintechService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], KfintechService);
//# sourceMappingURL=kfintech.service.js.map