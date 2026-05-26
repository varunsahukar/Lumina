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
var CamsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let CamsService = CamsService_1 = class CamsService {
    configService;
    logger = new common_1.Logger(CamsService_1.name);
    camsEndpoint;
    constructor(configService) {
        this.configService = configService;
        this.camsEndpoint =
            this.configService.get('CAMS_API_ENDPOINT') ||
                'https://api.camskra.com/v1';
    }
    async submitPurchaseOrder(request) {
        this.logger.log(`Routing BUY order to CAMS for scheme: ${request.schemeCode}`);
        const referenceNumber = `CAMS-TX-${Math.floor(10000000 + Math.random() * 90000000)}`;
        const folioNumber = request.folioNumber ||
            `FOLIO-${Math.floor(100000 + Math.random() * 900000)}`;
        return {
            success: true,
            referenceNumber,
            folioNumber,
            allocatedUnits: request.units || parseFloat((request.amount / 125.5).toFixed(4)),
            nav: 125.5,
            timestamp: new Date().toISOString(),
            remarks: 'Order received and settled successfully by CAMS RTA.',
        };
    }
    async submitRedemptionOrder(request) {
        this.logger.log(`Routing SELL order to CAMS for scheme: ${request.schemeCode}`);
        const referenceNumber = `CAMS-TX-${Math.floor(10000000 + Math.random() * 90000000)}`;
        return {
            success: true,
            referenceNumber,
            folioNumber: request.folioNumber || 'FOLIO-123456',
            timestamp: new Date().toISOString(),
            remarks: 'Redemption order executed. Funds will settle within T+2 working days.',
        };
    }
};
exports.CamsService = CamsService;
exports.CamsService = CamsService = CamsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CamsService);
//# sourceMappingURL=cams.service.js.map