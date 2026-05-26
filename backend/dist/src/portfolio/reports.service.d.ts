import { PortfolioService } from './portfolio.service';
import { PrismaService } from '../common/prisma.service';
export declare class ReportsService {
    private portfolioService;
    private prisma;
    constructor(portfolioService: PortfolioService, prisma: PrismaService);
    generatePdfReport(portfolioId: string): Promise<Buffer>;
    generateExcelReport(portfolioId: string): Promise<Buffer>;
}
