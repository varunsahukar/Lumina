import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'prices',
})
@Injectable()
export class PriceGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(PriceGateway.name);
  private subscriptions = new Map<string, Set<string>>(); // socketId -> Set of symbols
  private intervalId: NodeJS.Timeout | null = null;

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.subscriptions.set(client.id, new Set());

    // Start price broadcast loop if not running
    if (!this.intervalId) {
      this.startPriceBroadcastLoop();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.subscriptions.delete(client.id);

    // Stop price broadcast loop if no subscribers
    if (this.subscriptions.size === 0 && this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(
    @MessageBody() data: { symbol: string },
    @ConnectedSocket() client: Socket,
  ) {
    const symbol = data.symbol.toUpperCase();
    this.logger.log(`Client ${client.id} subscribed to: ${symbol}`);

    const clientSubs = this.subscriptions.get(client.id) || new Set();
    clientSubs.add(symbol);
    this.subscriptions.set(client.id, clientSubs);

    // Join room for this specific symbol
    client.join(symbol);

    return { status: 'subscribed', symbol };
  }

  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(
    @MessageBody() data: { symbol: string },
    @ConnectedSocket() client: Socket,
  ) {
    const symbol = data.symbol.toUpperCase();
    this.logger.log(`Client ${client.id} unsubscribed from: ${symbol}`);

    const clientSubs = this.subscriptions.get(client.id);
    if (clientSubs) {
      clientSubs.delete(symbol);
    }

    client.leave(symbol);

    return { status: 'unsubscribed', symbol };
  }

  private startPriceBroadcastLoop() {
    this.intervalId = setInterval(() => {
      // Gather all unique subscribed symbols
      const allSymbols = new Set<string>();
      this.subscriptions.forEach((symbols) => {
        symbols.forEach((s) => allSymbols.add(s));
      });

      // Broadcast new price ticks to each symbol room
      allSymbols.forEach((symbol) => {
        const tick = this.generatePriceTick(symbol);
        this.server.to(symbol).emit('priceTick', tick);
      });
    }, 2000); // Send update every 2 seconds
  }

  private generatePriceTick(symbol: string) {
    const basePrices: Record<string, number> = {
      AAPL: 185.0,
      MSFT: 420.0,
      RELIANCE: 2450.0,
      TCS: 3820.0,
      SENSEX: 72000.0,
      NIFTY: 22000.0,
    };

    const basePrice = basePrices[symbol] || 100.0;
    const change = (Math.random() - 0.5) * (basePrice * 0.005); // max 0.25% swing
    const price = parseFloat((basePrice + change).toFixed(2));
    const percentChange = parseFloat(((change / basePrice) * 100).toFixed(2));

    return {
      symbol,
      price,
      change: parseFloat(change.toFixed(2)),
      percentChange,
      timestamp: new Date().toISOString(),
    };
  }
}
