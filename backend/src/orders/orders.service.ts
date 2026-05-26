import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CamsService } from './cams.service';
import { KfintechService } from './kfintech.service';
import { TransactionType, TransactionStatus } from '../generated/prisma';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private camsService: CamsService,
    private kfintechService: KfintechService,
  ) {}

  async placeOrder(params: {
    userId: string;
    portfolioId: string;
    fundId: string;
    amount: number;
    type: TransactionType;
  }) {
    const { userId, portfolioId, fundId, amount, type } = params;

    // 1. Verify User, Portfolio and Fund
    const portfolio = await this.prisma.portfolio.findFirst({
      where: { id: portfolioId, userId },
    });
    if (!portfolio) throw new NotFoundException('Portfolio not found');

    const fund = await this.prisma.fund.findUnique({
      where: { id: fundId },
    });
    if (!fund) throw new NotFoundException('Fund not found');

    if (amount <= 0) {
      throw new BadRequestException('Amount must be positive');
    }

    const currentNav = Number(fund.nav);
    if (currentNav <= 0) {
      throw new BadRequestException('Invalid fund NAV, cannot place order');
    }

    // Determine RTA based on AMC Name
    const isKfintech =
      fund.amcName.toLowerCase().includes('axis') ||
      fund.amcName.toLowerCase().includes('nippon') ||
      fund.amcName.toLowerCase().includes('uti');

    const rtaRequest = {
      schemeCode: fund.schemeCode,
      investorPan: 'ABCDE1234F', // Mock PAN
      investorName: 'Test Investor',
      amount,
    };

    let rtaResult;

    // 2. Submit to the respective RTA
    if (type === TransactionType.BUY || type === TransactionType.SIP) {
      if (isKfintech) {
        rtaResult = await this.kfintechService.submitPurchaseOrder(rtaRequest);
      } else {
        rtaResult = await this.camsService.submitPurchaseOrder(rtaRequest);
      }
    } else if (type === TransactionType.SELL) {
      // For sell, we need to check if user has enough units
      const holding = await this.prisma.holding.findFirst({
        where: { portfolioId, fundId },
      });

      if (!holding || Number(holding.units) <= 0) {
        throw new BadRequestException(
          'No holdings found for this fund to sell',
        );
      }

      const unitsToSell = amount / currentNav;
      if (Number(holding.units) < unitsToSell) {
        throw new BadRequestException(
          `Insufficient units. Available: ${holding.units}, Requested: ${unitsToSell.toFixed(4)}`,
        );
      }

      if (isKfintech) {
        rtaResult = await this.kfintechService.submitRedemptionOrder({
          ...rtaRequest,
          units: unitsToSell,
        });
      } else {
        rtaResult = await this.camsService.submitRedemptionOrder({
          ...rtaRequest,
          units: unitsToSell,
        });
      }
    }

    if (!rtaResult || !rtaResult.success) {
      throw new BadRequestException('Transaction rejected by RTA');
    }

    const allocatedUnits = rtaResult.allocatedUnits || amount / currentNav;

    // 3. Create Transaction Record
    const tx = await this.prisma.transaction.create({
      data: {
        userId,
        fundId,
        type,
        amount,
        units: allocatedUnits,
        nav: currentNav,
        date: new Date(),
        status: TransactionStatus.COMPLETED,
      },
    });

    // 4. Update Portfolio Holdings
    const existingHolding = await this.prisma.holding.findFirst({
      where: { portfolioId, fundId },
    });

    if (type === TransactionType.BUY || type === TransactionType.SIP) {
      if (existingHolding) {
        const oldUnits = Number(existingHolding.units);
        const oldInvested = Number(existingHolding.investedAmount);
        const newUnits = oldUnits + allocatedUnits;
        const newInvested = oldInvested + amount;
        const avgNav = newInvested / newUnits;

        await this.prisma.holding.update({
          where: { id: existingHolding.id },
          data: {
            units: newUnits,
            investedAmount: newInvested,
            avgNav,
          },
        });
      } else {
        await this.prisma.holding.create({
          data: {
            portfolioId,
            fundId,
            units: allocatedUnits,
            investedAmount: amount,
            avgNav: currentNav,
          },
        });
      }
    } else if (type === TransactionType.SELL) {
      if (existingHolding) {
        const oldUnits = Number(existingHolding.units);
        const oldInvested = Number(existingHolding.investedAmount);
        const newUnits = Math.max(0, oldUnits - allocatedUnits);

        // Adjust invested amount proportionally
        const ratio = oldUnits > 0 ? newUnits / oldUnits : 0;
        const newInvested = oldInvested * ratio;

        if (newUnits === 0) {
          await this.prisma.holding.delete({
            where: { id: existingHolding.id },
          });
        } else {
          await this.prisma.holding.update({
            where: { id: existingHolding.id },
            data: {
              units: newUnits,
              investedAmount: newInvested,
            },
          });
        }
      }
    }

    return {
      transactionId: tx.id,
      status: tx.status,
      unitsAllocated: allocatedUnits,
      referenceNumber: rtaResult.referenceNumber,
      remarks: rtaResult.remarks,
    };
  }
}
