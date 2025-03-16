import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  // sign in
  @Post('signin')
  async signin() {
    return 'sign in'
  }

  // sign up
  @Post('signup')
  async signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto)
  }
}