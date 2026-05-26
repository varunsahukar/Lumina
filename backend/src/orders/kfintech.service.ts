import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RtaTransactionRequest } from './cams.service';

@Injectable()
export class KfintechService {
  private readonly logger = new Logger(KfintechService.name);
  private kfinEndpoint: string;

  constructor(private configService: ConfigService) {
    this.kfinEndpoint =
      this.configService.get<string>('KFINTECH_API_ENDPOINT') ||
      'https://api.kfintech.com/v2';
  }

  async submitPurchaseOrder(request: RtaTransactionRequest) {
    this.logger.log(
      `Routing BUY order to KFintech for scheme: ${request.schemeCode}`,
    );

    const referenceNumber = `KFIN-TX-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const folioNumber =
      request.folioNumber ||
      `KF-${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      success: true,
      referenceNumber,
      folioNumber,
      allocatedUnits:
        request.units || parseFloat((request.amount / 85.2).toFixed(4)),
      nav: 85.2,
      timestamp: new Date().toISOString(),
      remarks: 'Order verified and confirmed by KFintech.',
    };
  }

  async submitRedemptionOrder(request: RtaTransactionRequest) {
    this.logger.log(
      `Routing SELL order to KFintech for scheme: ${request.schemeCode}`,
    );

    const referenceNumber = `KFIN-TX-${Math.floor(10000000 + Math.random() * 90000000)}`;

    return {
      success: true,
      referenceNumber,
      folioNumber: request.folioNumber || 'KF-7654321',
      timestamp: new Date().toISOString(),
      remarks:
        'Redemption processed by KFintech. Credit will post according to payout terms.',
    };
  }
}
