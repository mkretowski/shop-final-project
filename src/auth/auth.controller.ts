import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Delete,
  Get,
} from '@nestjs/common';
import { RegisterDTO } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  register(@Body() registrationData: RegisterDTO) {
    return this.authService.register(registrationData);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const tokens = await this.authService.createSession(req.user);
    const user = await this.authService.getUserInfo(req.user.email);
    res.cookie('auth', tokens, { httpOnly: true });
    res.send({
      user,
      message: 'success',
    });
  }
  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Response() res) {
    res.clearCookie('auth', { httpOnly: true });
    res.send({
      message: 'success',
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUserInfo(@Request() req) {
    const user = await this.authService.getUserInfo(req.user.email);
    if (user) {
      return {
        user,
        message: 'success',
      };
    }
    return {
      message: 'User not found',
    };
  }
}
