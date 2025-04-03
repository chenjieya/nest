import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { AuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  // 生成jwt
  async signInJwt(userId: number, email: string): Promise<string> {
    // 定义 payload
    const payload = {
      email,
      sub: userId,
    };

    const secret = this.configService.get('JWT_SECRET') as string;

    return await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  }

  async signin(dto: AuthDto) {
    // 根据传入的值去数据库查找
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('用户不存在');

    // 校验密码是否正确
    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('密码输入错误');

    return {
      access_token: await this.signInJwt(user.id, user.email),
    };
  }

  async signup(dto: AuthDto) {
    // hash password
    const hashed = await argon.hash(dto.password);

    try {
      // save to database
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash: hashed,
        },
      });

      // delete user.hash
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hash, ...userVo } = user;
      return userVo;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('邮箱地址已存在');
        }
      }
      throw error;
    }
  }
}


// main 测试rebase