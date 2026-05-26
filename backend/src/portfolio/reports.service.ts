import { Injectable } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PrismaService } from '../common/prisma.service';
import PDFDocument from 'pdfkit';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ReportsService {
  constructor(
    private portfolioService: PortfolioService,
    private prisma: PrismaService,
  ) {}

  async generatePdfReport(portfolioId: string): Promise<Buffer> {
    const valuation =
      await this.portfolioService.getPortfolioValuation(portfolioId);

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      // Title & Header
      doc
        .fontSize(20)
        .text('LuminaVest Portfolio Statement', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Portfolio Name: ${valuation.portfolioName}`);
      doc.text(`Generated On: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      // Summary Cards
      doc.rect(50, 150, 500, 80).stroke();
      doc.text(
        `Total Invested Value: INR ${valuation.totalInvested.toLocaleString()}`,
        70,
        170,
      );
      doc.text(
        `Current Market Value: INR ${valuation.totalCurrentValue.toLocaleString()}`,
        70,
        190,
      );
      doc.text(
        `Total Gains / Loss: INR ${valuation.totalProfitLoss.toLocaleString()} (${valuation.absoluteReturnPct.toFixed(2)}%)`,
        70,
        210,
      );

      // Holdings Table Header
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
        // Truncate name if long
        const name =
          holding.schemeName.length > 25
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

  async generateExcelReport(portfolioId: string): Promise<Buffer> {
    const valuation =
      await this.portfolioService.getPortfolioValuation(portfolioId);

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

    // Format headers
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
        returnsPct: holding.returnsPct / 100, // display as decimal for Excel percentage formatting
      });
    }

    // Add summary row
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
}
