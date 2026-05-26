import { OrdersService } from './orders.service';
import { TransactionType } from '../generated/prisma';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    executeOrder(req: any, portfolioId: string, fundId: string, amount: number, type: TransactionType): Promise<{
        transactionId: string;
        status: import("../generated/prisma").$Enums.TransactionStatus;
        unitsAllocated: any;
        referenceNumber: any;
        remarks: any;
    }>;
}
