"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const common_module_1 = require("./common/common.module");
const auth_module_1 = require("./auth/auth.module");
const market_data_module_1 = require("./market-data/market-data.module");
const funds_module_1 = require("./funds/funds.module");
const portfolio_module_1 = require("./portfolio/portfolio.module");
const orders_module_1 = require("./orders/orders.module");
const research_module_1 = require("./research/research.module");
const websocket_module_1 = require("./websocket/websocket.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            market_data_module_1.MarketDataModule,
            funds_module_1.FundsModule,
            portfolio_module_1.PortfolioModule,
            orders_module_1.OrdersModule,
            research_module_1.ResearchModule,
            websocket_module_1.WebsocketModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map