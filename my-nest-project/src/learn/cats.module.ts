import { Module } from '@nestjs/common';
import { CreateCatController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CreateCatController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
