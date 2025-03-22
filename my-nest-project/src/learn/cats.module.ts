import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CreateCatController } from './cats.controller';
import { CatsService } from './cats.service';

import { LoggerMiddleware } from '../logger.middleware';
import { funcMiddleware } from '../func.middleware';

@Module({
  controllers: [CreateCatController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, funcMiddleware)
      .exclude({ path: 'cat', method: RequestMethod.POST })
      .forRoutes(CreateCatController);
  }
}
