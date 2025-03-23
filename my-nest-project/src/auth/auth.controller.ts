import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // sign up 注册
  @Post('signup')
  async signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  // sign in  登录
  @Post('signin')
  async signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }
}
