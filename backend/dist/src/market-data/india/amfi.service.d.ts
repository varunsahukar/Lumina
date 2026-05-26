import { PrismaService } from '../../common/prisma.service';
import { HttpService } from '@nestjs/axios';
export declare class AmfiService {
    private prisma;
    private httpService;
    private readonly logger;
    private readonly amfiUrl;
    constructor(prisma: PrismaService, httpService: HttpService);
    fetchAndSyncNavs(): Promise<{
        totalProcessed: number;
        updated: number;
    }>;
}
