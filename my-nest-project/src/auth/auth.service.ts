import { ForbiddenException, Injectable } from "@nestjs/common";
import * as argon from 'argon2'

import { AuthDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {

  constructor(private prismaService: PrismaService) {
  }

  signin() {

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
          throw new ForbiddenException('Credentials taken')
        }
      }
      throw error
    }
  }

}
