import { PrismaService } from '../common/prisma.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class KycService {
    private prisma;
    private httpService;
    private configService;
    private signzyBaseUrl;
    private signzyToken;
    private perfiosBaseUrl;
    constructor(prisma: PrismaService, httpService: HttpService, configService: ConfigService);
    initiateKyc(userId: string): Promise<{
        password: string | null;
        name: string | null;
        role: import("../generated/prisma").$Enums.UserRole;
        id: string;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        kycStatus: import("../generated/prisma").$Enums.KycStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    verifyPanWithSignzy(userId: string, panNumber: string): Promise<{
        password: string | null;
        name: string | null;
        role: import("../generated/prisma").$Enums.UserRole;
        id: string;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        kycStatus: import("../generated/prisma").$Enums.KycStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    uploadBankStatementWithPerfios(userId: string, fileBuffer: Buffer): Promise<{
        jobId: string;
        status: string;
        submittedAt: Date;
    }>;
    getKycStatus(userId: string): Promise<{
        kycStatus: import("../generated/prisma").$Enums.KycStatus;
    }>;
}
