import { AuthService } from './auth.service';
import { KycService } from './kyc.service';
import { UserRole } from '../generated/prisma';
export declare class AuthController {
    private readonly authService;
    private readonly kycService;
    constructor(authService: AuthService, kycService: KycService);
    register(email: string, password: string, name?: string, role?: UserRole): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            kycStatus: any;
        };
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            kycStatus: any;
        };
    }>;
    getMe(req: any): any;
    initiateKyc(req: any): Promise<{
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
    }>;
    verifyPan(req: any, panNumber: string): Promise<{
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
    }>;
    getKyc(req: any): Promise<{
        kycStatus: import("../generated/prisma").$Enums.KycStatus;
    }>;
}
