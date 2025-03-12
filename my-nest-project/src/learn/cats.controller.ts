import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('/cat')
export class CreateCatController {
  constructor(private CatsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.CatsService.create(createCatDto);
  }

  @Get()
  findAll(): Cat[] {
    return this.CatsService.findAll();
  }
}
