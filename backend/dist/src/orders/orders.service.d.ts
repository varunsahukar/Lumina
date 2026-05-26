import { PrismaService } from '../common/prisma.service';
import { CamsService } from './cams.service';
import { KfintechService } from './kfintech.service';
import { TransactionType } from '../generated/prisma';
export declare class OrdersService {
    private prisma;
    private camsService;
    private kfintechService;
    constructor(prisma: PrismaService, camsService: CamsService, kfintechService: KfintechService);
    placeOrder(params: {
        userId: string;
        portfolioId: string;
        fundId: string;
        amount: number;
        type: TransactionType;
    }): Promise<{
        transactionId: string;
        status: import("../generated/prisma").$Enums.TransactionStatus;
        unitsAllocated: any;
        referenceNumber: any;
        remarks: any;
    }>;
}
