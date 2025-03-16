import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 启用全局 CORS 支持
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  })); // 全局验证管道

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
