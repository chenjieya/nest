import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/nest')
  getNest(): string {
    return 'Hello Nest!';
  }

  @Post('/nest')
  @HttpCode(200)
  postNest(): string {
    return 'Hello Nest Post!';
  }

  @Post('/nest/redirect')
  @Redirect('http://localhost:3000')
  redirectNest(): string {
    return 'Hello Nest Redirect!';
  }

  @Delete('/nest/dynamic/:id')
  dynamicNest(@Param() params: { id: string }): string {
    console.log(params.id);
    return `Hello Nest Dynamic #${params.id}!`;
  }

  @Delete('/nest/dynamicV2/:id')
  dynamicNestV2(@Param('id') id: string): string {
    console.log(id, 'v2');
    return `Hello Nest Dynamic #${id}!`;
  }
}
