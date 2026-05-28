import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { KycService } from './kyc.service';
import { JwtGuard } from './guards/jwt.guard';
import { UserRole } from '../generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly kycService: KycService,
  ) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name?: string,
    @Body('role') role?: UserRole,
  ) {
    const user = await this.authService.register(email, password, name, role);
    return this.authService.login(user);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.authService.login(user);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@Req() req: any) {
    const { password, ...user } = req.user;
    return user;
  }

  @Post('kyc/initiate')
  @UseGuards(JwtGuard)
  initiateKyc(@Req() req: any) {
    return this.kycService.initiateKyc(req.user.id);
  }

  @Post('kyc/pan')
  @UseGuards(JwtGuard)
  verifyPan(@Req() req: any, @Body('panNumber') panNumber: string) {
    return this.kycService.verifyPanWithSignzy(req.user.id, panNumber);
  }

  @Get('kyc')
  @UseGuards(JwtGuard)
  getKyc(@Req() req: any) {
    return this.kycService.getKycStatus(req.user.id);
  }
}
