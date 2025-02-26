import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ConfigService)
  private configService: ConfigService;

  @Get()
  getHello() {
    console.log(process.env);
    return {
      aaa: this.configService.get('aaa'),
      bbb: this.configService.get('bbb'),
      ccc: this.configService.get('ccc'),
      db: this.configService.get('db'),
    };
  }
}
