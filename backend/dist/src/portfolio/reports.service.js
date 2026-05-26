"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const portfolio_service_1 = require("./portfolio.service");
const prisma_service_1 = require("../common/prisma.service");
const pdfkit_1 = __importDefault(require("pdfkit"));
const ExcelJS = __importStar(require("exceljs"));
let ReportsService = class ReportsService {
    portfolioService;
    prisma;
    constructor(portfolioService, prisma) {
        this.portfolioService = portfolioService;
        this.prisma = prisma;
    }
    async generatePdfReport(portfolioId) {
        const valuation = await this.portfolioService.getPortfolioValuation(portfolioId);
        return new Promise((resolve, reject) => {
            const doc = new pdfkit_1.default({ margin: 50 });
            const chunks = [];
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', (err) => reject(err));
            doc
                .fontSize(20)
                .text('LuminaVest Portfolio Statement', { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Portfolio Name: ${valuation.portfolioName}`);
            doc.text(`Generated On: ${new Date().toLocaleDateString()}`);
            doc.moveDown();
            doc.rect(50, 150, 500, 80).stroke();
            doc.text(`Total Invested Value: INR ${valuation.totalInvested.toLocaleString()}`, 70, 170);
            doc.text(`Current Market Value: INR ${valuation.totalCurrentValue.toLocaleString()}`, 70, 190);
            doc.text(`Total Gains / Loss: INR ${valuation.totalProfitLoss.toLocaleString()} (${valuation.absoluteReturnPct.toFixed(2)}%)`, 70, 210);
            let y = 260;
            doc.font('Helvetica-Bold');
            doc.text('Scheme Name', 50, y);
            doc.text('Units', 250, y);
            doc.text('Invested', 350, y);
            doc.text('Current Value', 450, y);
            doc.font('Helvetica');
            doc
                .moveTo(50, y + 15)
                .lineTo(550, y + 15)
                .stroke();
            y += 25;
            doc.fontSize(10);
            for (const holding of valuation.holdings) {
                const name = holding.schemeName.length > 25
                    ? holding.schemeName.slice(0, 22) + '...'
                    : holding.schemeName;
                doc.text(name, 50, y);
                doc.text(holding.units.toFixed(3), 250, y);
                doc.text(holding.investedAmount.toFixed(2), 350, y);
                doc.text(holding.currentValue.toFixed(2), 450, y);
                y += 20;
                if (y > 700) {
                    doc.addPage();
                    y = 50;
                }
            }
            doc.end();
        });
    }
    async generateExcelReport(portfolioId) {
        const valuation = await this.portfolioService.getPortfolioValuation(portfolioId);
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Portfolio Valuation');
        sheet.columns = [
            { header: 'Scheme Name', key: 'schemeName', width: 40 },
            { header: 'Units Owned', key: 'units', width: 15 },
            { header: 'Average Purchase NAV', key: 'avgNav', width: 20 },
            { header: 'Current NAV', key: 'currentNav', width: 15 },
            { header: 'Total Invested Amount', key: 'investedAmount', width: 22 },
            { header: 'Current Market Value', key: 'currentValue', width: 22 },
            { header: 'Unrealized Gain/Loss', key: 'profitLoss', width: 22 },
            { header: 'Absolute Return (%)', key: 'returnsPct', width: 20 },
        ];
        sheet.getRow(1).font = { bold: true };
        for (const holding of valuation.holdings) {
            sheet.addRow({
                schemeName: holding.schemeName,
                units: holding.units,
                avgNav: holding.avgNav,
                currentNav: holding.currentNav,
                investedAmount: holding.investedAmount,
                currentValue: holding.currentValue,
                profitLoss: holding.profitLoss,
                returnsPct: holding.returnsPct / 100,
            });
        }
        sheet.addRow({});
        sheet.addRow({
            schemeName: 'TOTAL PORTFOLIO',
            investedAmount: valuation.totalInvested,
            currentValue: valuation.totalCurrentValue,
            profitLoss: valuation.totalProfitLoss,
            returnsPct: valuation.absoluteReturnPct / 100,
        });
        const totalRowIndex = sheet.rowCount;
        sheet.getRow(totalRowIndex).font = { bold: true };
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService,
        prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map