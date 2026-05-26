import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AmfiService {
  private readonly logger = new Logger(AmfiService.name);
  private readonly amfiUrl = 'https://www.amfiindia.com/spages/NAVAll.txt';

  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async fetchAndSyncNavs(): Promise<{
    totalProcessed: number;
    updated: number;
  }> {
    this.logger.log('Downloading AMFI NAV records...');
    let dataText: string;

    try {
      const response = await firstValueFrom(
        this.httpService.get(this.amfiUrl, { responseType: 'text' }),
      );
      dataText = response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch AMFI data: ${error.message}`);
      throw error;
    }

    const lines = dataText.split('\n');
    let totalProcessed = 0;
    let updated = 0;

    this.logger.log(`Parsing ${lines.length} lines of AMFI data...`);

    // We process lines in chunks or batch transactions for optimization
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const parts = trimmed.split(';');
      if (parts.length < 6) continue;

      const schemeCode = parts[0].trim();
      const schemeName = parts[3]?.trim();
      const navStr = parts[4]?.trim();
      const dateStr = parts[5]?.trim(); // DD-MMM-YYYY (e.g. 25-May-2026)

      // Skip header lines (schemeCode must be numeric)
      if (isNaN(Number(schemeCode)) || !schemeCode) continue;

      const nav = parseFloat(navStr);
      if (isNaN(nav)) continue;

      totalProcessed++;

      try {
        // Parse date (e.g., "25-May-2026")
        let navDate = new Date();
        if (dateStr) {
          const parsedDate = Date.parse(dateStr);
          if (!isNaN(parsedDate)) {
            navDate = new Date(parsedDate);
          }
        }

        // Check if fund already exists
        const existingFund = await this.prisma.fund.findUnique({
          where: { schemeCode },
        });

        if (existingFund) {
          // Update current NAV
          await this.prisma.fund.update({
            where: { id: existingFund.id },
            data: {
              nav,
              updatedAt: new Date(),
            },
          });

          // Insert into NAV history if not exists for this day
          await this.prisma.navHistory.upsert({
            where: {
              fundId_date: {
                fundId: existingFund.id,
                date: navDate,
              },
            },
            update: { nav },
            create: {
              fundId: existingFund.id,
              nav,
              date: navDate,
            },
          });
          updated++;
        } else {
          // Create new fund record
          const amcName = schemeName.split(' ')[0] || 'Unknown';
          const newFund = await this.prisma.fund.create({
            data: {
              schemeCode,
              schemeName,
              amcName,
              category: 'Mutual Fund',
              subCategory: 'Equity/Debt',
              nav,
              isActive: true,
            },
          });

          await this.prisma.navHistory.create({
            data: {
              fundId: newFund.id,
              nav,
              date: navDate,
            },
          });
          updated++;
        }
      } catch (err) {
        this.logger.debug(
          `Failed to sync scheme ${schemeCode}: ${err.message}`,
        );
      }
    }

    this.logger.log(
      `Sync completed. Processed ${totalProcessed} funds, synced ${updated} records.`,
    );
    return { totalProcessed, updated };
  }
}
