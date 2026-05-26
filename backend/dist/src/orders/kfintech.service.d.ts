import { ConfigService } from '@nestjs/config';
import { RtaTransactionRequest } from './cams.service';
export declare class KfintechService {
    private configService;
    private readonly logger;
    private kfinEndpoint;
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
