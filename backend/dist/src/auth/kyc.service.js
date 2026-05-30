"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KycService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const prisma_1 = require("../generated/prisma");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
let KycService = class KycService {
    prisma;
    httpService;
    configService;
    signzyBaseUrl;
    signzyToken;
    perfiosBaseUrl;
    constructor(prisma, httpService, configService) {
        this.prisma = prisma;
        this.httpService = httpService;
        this.configService = configService;
        this.signzyBaseUrl =
            this.configService.get('SIGNZY_BASE_URL') ||
                'https://api.signzy.app/v2';
        this.signzyToken =
            this.configService.get('SIGNZY_API_TOKEN') || 'mock-signzy-token';
        this.perfiosBaseUrl =
            this.configService.get('PERFIOS_BASE_URL') ||
                'https://api.perfios.com/v1';
    }
    async initiateKyc(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.prisma.user.update({
            where: { id: userId },
            data: { kycStatus: prisma_1.KycStatus.PENDING },
        });
    }
    async verifyPanWithSignzy(userId, panNumber) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
            throw new common_1.BadRequestException('Invalid PAN number format');
        }
        try {
            const mockSuccess = true;
            if (mockSuccess) {
                return this.prisma.user.update({
                    where: { id: userId },
                    data: { kycStatus: prisma_1.KycStatus.VERIFIED },
                });
            }
            return this.prisma.user.update({
                where: { id: userId },
                data: { kycStatus: prisma_1.KycStatus.REJECTED },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Signzy PAN verification failed: ${error.message}`);
        }
    }
    async uploadBankStatementWithPerfios(userId, fileBuffer) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        try {
            const mockAnalysisId = 'perfios-job-xyz123';
            return {
                jobId: mockAnalysisId,
                fileSizeBytes: fileBuffer.length,
                status: 'analyzing',
                submittedAt: new Date(),
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Perfios document upload failed: ${error.message}`);
        }
    }
    async getKycStatus(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { kycStatus: true },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
};
exports.KycService = KycService;
exports.KycService = KycService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService,
        config_1.ConfigService])
], KycService);
//# sourceMappingURL=kyc.service.js.map