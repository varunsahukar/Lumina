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
exports.FundsController = void 0;
const common_1 = require("@nestjs/common");
const funds_service_1 = require("./funds.service");
const screener_service_1 = require("./screener.service");
const comparison_service_1 = require("./comparison.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let FundsController = class FundsController {
    fundsService;
    screenerService;
    comparisonService;
    constructor(fundsService, screenerService, comparisonService) {
        this.fundsService = fundsService;
        this.screenerService = screenerService;
        this.comparisonService = comparisonService;
    }
    async getFunds(skip, take, category, search) {
        return this.fundsService.findAll({ skip, take, category, search });
    }
    async getCategories() {
        return this.fundsService.getCategories();
    }
    async compare(idsString) {
        const ids = idsString ? idsString.split(',') : [];
        return this.comparisonService.compareFunds(ids);
    }
    async screen(category, minAum, maxExpenseRatio, minSharpe, minReturns1y, minReturns3y, minReturns5y, sortBy, sortOrder, limit) {
        const filters = {
            category,
            minAum: minAum ? Number(minAum) : undefined,
            maxExpenseRatio: maxExpenseRatio ? Number(maxExpenseRatio) : undefined,
            minSharpe: minSharpe ? Number(minSharpe) : undefined,
            minReturns1y: minReturns1y ? Number(minReturns1y) : undefined,
            minReturns3y: minReturns3y ? Number(minReturns3y) : undefined,
            minReturns5y: minReturns5y ? Number(minReturns5y) : undefined,
            sortBy,
            sortOrder,
            limit: limit ? Number(limit) : undefined,
        };
        return this.screenerService.screenFunds(filters);
    }
    async getFund(id) {
        return this.fundsService.findOne(id);
    }
    async getNavHistory(id, limit) {
        return this.fundsService.getNavHistory(id, limit);
    }
};
exports.FundsController = FundsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], FundsController.prototype, "getFunds", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FundsController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('compare'),
    __param(0, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FundsController.prototype, "compare", null);
__decorate([
    (0, common_1.Get)('screen'),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('minAum')),
    __param(2, (0, common_1.Query)('maxExpenseRatio')),
    __param(3, (0, common_1.Query)('minSharpe')),
    __param(4, (0, common_1.Query)('minReturns1y')),
    __param(5, (0, common_1.Query)('minReturns3y')),
    __param(6, (0, common_1.Query)('minReturns5y')),
    __param(7, (0, common_1.Query)('sortBy')),
    __param(8, (0, common_1.Query)('sortOrder')),
    __param(9, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, Number, Number, Number, String, String, Number]),
    __metadata("design:returntype", Promise)
], FundsController.prototype, "screen", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FundsController.prototype, "getFund", null);
__decorate([
    (0, common_1.Get)(':id/history'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], FundsController.prototype, "getNavHistory", null);
exports.FundsController = FundsController = __decorate([
    (0, common_1.Controller)('funds'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [funds_service_1.FundsService,
        screener_service_1.ScreenerService,
        comparison_service_1.ComparisonService])
], FundsController);
//# sourceMappingURL=funds.controller.js.map