import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_LOGGER_TOKEN))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
