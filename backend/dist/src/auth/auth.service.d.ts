import { PrismaService } from '../common/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../generated/prisma';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string, name?: string, role?: UserRole): Promise<Omit<{
        id: string;
        name: string | null;
        email: string;
        emailVerified: Date | null;
        password: string | null;
        image: string | null;
        role: import("../generated/prisma").$Enums.UserRole;
        kycStatus: import("../generated/prisma").$Enums.KycStatus;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
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
    validateSession(token: string): Promise<Omit<{
        id: string;
        name: string | null;
        email: string;
        emailVerified: Date | null;
        password: string | null;
        image: string | null;
        role: import("../generated/prisma").$Enums.UserRole;
        kycStatus: import("../generated/prisma").$Enums.KycStatus;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    private withoutPassword;
}
