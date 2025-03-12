import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './learn/cats.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [CatsModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
