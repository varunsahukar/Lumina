import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecEdgarService {
  private readonly logger = new Logger(SecEdgarService.name);
  private userAgent: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    // SEC Edgar API requires a specific User-Agent containing company name and email
    this.userAgent =
      this.configService.get<string>('SEC_EDGAR_USER_AGENT') ||
      'LuminaVest Research admin@luminavest.com';
  }

  async getCompanyFilings(cik: string) {
    if (!cik) throw new BadRequestException('CIK number is required');
    const paddedCik = cik.trim().padStart(10, '0');

    try {
      // Fetching filing histories from SEC Edgar
      // In production, we execute the HTTP call:
      // const response = await firstValueFrom(
      //   this.httpService.get(`https://data.sec.gov/submissions/CIK${paddedCik}.json`, {
      //     headers: { 'User-Agent': this.userAgent }
      //   })
      // );
      // return response.data;

      // Mock response for development
      return {
        cik: paddedCik,
        entityType: 'operating company',
        sic: '7372',
        sicDescription: 'Services-Prepackaged Software',
        name: 'MICROSOFT CORP',
        tickers: ['MSFT'],
        exchanges: ['NASDAQ'],
        filings: {
          recent: {
            accessionNumber: ['0001564590-26-000010'],
            filingDate: [new Date().toISOString().split('T')[0]],
            reportDate: ['2026-03-31'],
            form: ['10-Q'],
            fileNumber: ['001-37845'],
            filmNumber: ['2674312'],
            items: [''],
            size: [3219045],
            isXBRL: [1],
            isInlineXBRL: [1],
            primaryDocument: ['msft-10q.htm'],
            primaryDocDescription: ['FORM 10-Q'],
          },
        },
      };
    } catch (error) {
      this.logger.error(
        `SEC Edgar request failed for CIK ${paddedCik}: ${error.message}`,
      );
      throw new BadRequestException(
        `Failed to retrieve SEC filings: ${error.message}`,
      );
    }
  }
}
