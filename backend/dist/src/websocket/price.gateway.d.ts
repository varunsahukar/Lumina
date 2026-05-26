import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class PriceGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger;
    private subscriptions;
    private intervalId;
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleSubscribe(data: {
        symbol: string;
    }, client: Socket): {
        status: string;
        symbol: string;
    };
    handleUnsubscribe(data: {
        symbol: string;
    }, client: Socket): {
        status: string;
        symbol: string;
    };
    private startPriceBroadcastLoop;
    private generatePriceTick;
}
