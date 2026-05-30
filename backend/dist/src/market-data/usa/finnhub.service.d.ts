import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
export declare class FinnhubService implements OnModuleInit, OnModuleDestroy {
    private httpService;
    private configService;
    private readonly logger;
    private apiKey;
    private wsUrl;
    private ws;
    constructor(httpService: HttpService, configService: ConfigService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    private connectWebSocket;
    private decodeWebSocketPacket;
    getUsStockQuote(symbol: string): Promise<{
        symbol: string;
        currentPrice: any;
        highPrice: any;
        lowPrice: any;
        openPrice: any;
        previousClosePrice: any;
        timestamp: any;
    }>;
}
