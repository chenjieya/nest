import { ForbiddenException, Injectable } from "@nestjs/common";
import * as argon from 'argon2'

import { AuthDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {

  constructor(private prismaService: PrismaService) {
  }

  async signin(dto: AuthDto) {
    // 根据传入的值去数据库查找
    const user =
      await this.prismaService.user.findUnique({
        where: {
          email: dto.email
        }
    })
    if(!user) throw new ForbiddenException("用户不存在")

    // 校验密码是否正确
    const pwMatches =
      await argon.verify(user.hash, dto.password)

    if(!pwMatches) throw new ForbiddenException("密码输入错误")
    // 返回用户信息
    const { hash, ...userVo} = user
    return userVo
  }

  async signup(dto: AuthDto) {
    // hash password
    const hashed = await argon.hash(dto.password)

    try {
      // save to database
       const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash: hashed
        }
      })

      // delete user.hash
      const { hash, ...userVo } = user
      return userVo
    } catch(error) {
      if(error instanceof PrismaClientKnownRequestError) {
        if(error.code === 'P2002') {
          throw new ForbiddenException('邮箱地址已存在')
        }
      }
      throw error
    }
  }

}
