import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private prisma;
    constructor(configService: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<{
        password: string | null;
        name: string | null;
        role: import("src/generated/prisma").$Enums.UserRole;
        id: string;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        kycStatus: import("src/generated/prisma").$Enums.KycStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
