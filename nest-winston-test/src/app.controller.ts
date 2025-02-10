import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';
import { MyLogger } from './winston/MyLogger';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(WINSTON_LOGGER_TOKEN)
  private logger: MyLogger;

  @Get()
  getHello(): string {
    this.logger.log('Hello', AppController.name)
    return this.appService.getHello();
  }
}
