import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true})); // Add this line to enable validation for all controllers and guards

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
