import { PrismaService } from '../common/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../generated/prisma';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string, name?: string, role?: UserRole): Promise<{
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
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            kycStatus: any;
        };
    }>;
    validateSession(token: string): Promise<{
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
}
