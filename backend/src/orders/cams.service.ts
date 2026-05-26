import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface RtaTransactionRequest {
  schemeCode: string;
  investorPan: string;
  investorName: string;
  amount: number;
  units?: number;
  folioNumber?: string;
}

@Injectable()
export class CamsService {
  private readonly logger = new Logger(CamsService.name);
  private camsEndpoint: string;

  constructor(private configService: ConfigService) {
    this.camsEndpoint =
      this.configService.get<string>('CAMS_API_ENDPOINT') ||
      'https://api.camskra.com/v1';
  }

  async submitPurchaseOrder(request: RtaTransactionRequest) {
    this.logger.log(
      `Routing BUY order to CAMS for scheme: ${request.schemeCode}`,
    );

    // In production, make a POST request with signed payloads:
    // const res = await axios.post(`${this.camsEndpoint}/transact`, request, { headers: { Auth: 'Bearer Token' } });
    // return res.data;

    // Simulate RTA response delay and success
    const referenceNumber = `CAMS-TX-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const folioNumber =
      request.folioNumber ||
      `FOLIO-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      success: true,
      referenceNumber,
      folioNumber,
      allocatedUnits:
        request.units || parseFloat((request.amount / 125.5).toFixed(4)), // estimate units if not provided
      nav: 125.5,
      timestamp: new Date().toISOString(),
      remarks: 'Order received and settled successfully by CAMS RTA.',
    };
  }

  async submitRedemptionOrder(request: RtaTransactionRequest) {
    this.logger.log(
      `Routing SELL order to CAMS for scheme: ${request.schemeCode}`,
    );

    const referenceNumber = `CAMS-TX-${Math.floor(10000000 + Math.random() * 90000000)}`;

    return {
      success: true,
      referenceNumber,
      folioNumber: request.folioNumber || 'FOLIO-123456',
      timestamp: new Date().toISOString(),
      remarks:
        'Redemption order executed. Funds will settle within T+2 working days.',
    };
  }
}
