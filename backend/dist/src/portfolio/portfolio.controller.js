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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const portfolio_service_1 = require("./portfolio.service");
const rebalance_service_1 = require("./rebalance.service");
const reports_service_1 = require("./reports.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let PortfolioController = class PortfolioController {
    portfolioService;
    rebalanceService;
    reportsService;
    constructor(portfolioService, rebalanceService, reportsService) {
        this.portfolioService = portfolioService;
        this.rebalanceService = rebalanceService;
        this.reportsService = reportsService;
    }
    async getPortfolios(req) {
        return this.portfolioService.getPortfolios(req.user.id);
    }
    async createPortfolio(req, name) {
        return this.portfolioService.createPortfolio(req.user.id, name);
    }
    async getValuation(id) {
        return this.portfolioService.getPortfolioValuation(id);
    }
    async getRebalanceSuggestions(id, targets) {
        return this.rebalanceService.calculateRebalanceSuggestions(id, targets);
    }
    async downloadPdf(id, res) {
        const buffer = await this.reportsService.generatePdfReport(id);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=portfolio-${id}-statement.pdf`,
            'Content-Length': buffer.length,
        });
        res.end(buffer);
    }
    async downloadExcel(id, res) {
        const buffer = await this.reportsService.generateExcelReport(id);
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename=portfolio-${id}-statement.xlsx`,
            'Content-Length': buffer.length,
        });
        res.end(buffer);
    }
};
exports.PortfolioController = PortfolioController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getPortfolios", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "createPortfolio", null);
__decorate([
    (0, common_1.Get)(':id/valuation'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getValuation", null);
__decorate([
    (0, common_1.Post)(':id/rebalance'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('targets')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getRebalanceSuggestions", null);
__decorate([
    (0, common_1.Get)(':id/report/pdf'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "downloadPdf", null);
__decorate([
    (0, common_1.Get)(':id/report/excel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "downloadExcel", null);
exports.PortfolioController = PortfolioController = __decorate([
    (0, common_1.Controller)('portfolio'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService,
        rebalance_service_1.RebalanceService,
        reports_service_1.ReportsService])
], PortfolioController);
//# sourceMappingURL=portfolio.controller.js.map