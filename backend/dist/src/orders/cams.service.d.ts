import { ConfigService } from '@nestjs/config';
export interface RtaTransactionRequest {
    schemeCode: string;
    investorPan: string;
    investorName: string;
    amount: number;
    units?: number;
    folioNumber?: string;
}
export declare class CamsService {
    private configService;
    private readonly logger;
    private camsEndpoint;
    constructor(configService: ConfigService);
    submitPurchaseOrder(request: RtaTransactionRequest): Promise<{
        success: boolean;
        referenceNumber: string;
        folioNumber: string;
        allocatedUnits: number;
        nav: number;
        timestamp: string;
        remarks: string;
    }>;
    submitRedemptionOrder(request: RtaTransactionRequest): Promise<{
        success: boolean;
        referenceNumber: string;
        folioNumber: string;
        timestamp: string;
        remarks: string;
    }>;
}
