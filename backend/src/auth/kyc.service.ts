import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { KycStatus } from '../generated/prisma';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KycService {
  private signzyBaseUrl: string;
  private signzyToken: string;
  private perfiosBaseUrl: string;

  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.signzyBaseUrl =
      this.configService.get<string>('SIGNZY_BASE_URL') ||
      'https://api.signzy.app/v2';
    this.signzyToken =
      this.configService.get<string>('SIGNZY_API_TOKEN') || 'mock-signzy-token';
    this.perfiosBaseUrl =
      this.configService.get<string>('PERFIOS_BASE_URL') ||
      'https://api.perfios.com/v1';
  }

  async initiateKyc(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id: userId },
      data: { kycStatus: KycStatus.PENDING },
    });
  }

  async verifyPanWithSignzy(userId: string, panNumber: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
      throw new BadRequestException('Invalid PAN number format');
    }

    try {
      // In a real environment, we would make a POST request to Signzy:
      // const response = await firstValueFrom(
      //   this.httpService.post(`${this.signzyBaseUrl}/panVerify`, { pan: panNumber }, {
      //     headers: { Authorization: this.signzyToken }
      //   })
      // );
      // const data = response.data;

      // Mocking successful Signzy API validation:
      const mockSuccess = true;
      if (mockSuccess) {
        return this.prisma.user.update({
          where: { id: userId },
          data: { kycStatus: KycStatus.VERIFIED },
        });
      }

      return this.prisma.user.update({
        where: { id: userId },
        data: { kycStatus: KycStatus.REJECTED },
      });
    } catch (error) {
      throw new BadRequestException(
        `Signzy PAN verification failed: ${error.message}`,
      );
    }
  }

  async uploadBankStatementWithPerfios(userId: string, fileBuffer: Buffer) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    try {
      // Mocking Perfios Statement Upload and Analysis
      // Real code would invoke Perfios multi-part APIs
      const mockAnalysisId = 'perfios-job-xyz123';

      return {
        jobId: mockAnalysisId,
        fileSizeBytes: fileBuffer.length,
        status: 'analyzing',
        submittedAt: new Date(),
      };
    } catch (error) {
      throw new BadRequestException(
        `Perfios document upload failed: ${error.message}`,
      );
    }
  }

  async getKycStatus(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { kycStatus: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
