import { Controller, ForbiddenException, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUser } from 'src/auth/decorator';

@Controller('users')
export class UserController {
  constructor(private prismaService: PrismaService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@GetUser('sub') userId: number) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ForbiddenException('用户不存在');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...userVo } = user;
    return userVo;
  }
}
