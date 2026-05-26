import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { TransactionType } from '../generated/prisma';

@Controller('orders')
@UseGuards(JwtGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async executeOrder(
    @Req() req: any,
    @Body('portfolioId') portfolioId: string,
    @Body('fundId') fundId: string,
    @Body('amount') amount: number,
    @Body('type') type: TransactionType,
  ) {
    return this.ordersService.placeOrder({
      userId: req.user.id,
      portfolioId,
      fundId,
      amount,
      type,
    });
  }
}
