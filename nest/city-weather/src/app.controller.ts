import { Controller, Get, Inject, Query, Param, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import pinyin from 'pinyin';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(HttpService)
  private httpService: HttpService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('weather/:city')
  async weather(@Param('city') city: string) {
  const cityPinyin = pinyin(city, { style: pinyin.STYLE_NORMAL}).join('');

  // https://id.qweather.com/#/homepage
  const { data } = await firstValueFrom(
    this.httpService.get(`https://geoapi.qweather.com/v2/city/lookup?location=${cityPinyin}&key=your_key`)
  )

  const location = data?.['location']?.[0];
  if(!location) {
    throw new BadRequestException('没有对应的城市信息');
  }

  const id = location.id
  const { data: weatherData } = await firstValueFrom(
    this.httpService.get(`https://devapi.qweather.com/v7/weather/7d?location=${id}&key=your_key`)
  )

  return weatherData;
}

  @Get('pinyin')
  pinyin(@Query('text') text: string) {
      return pinyin(text, {
        style: pinyin.STYLE_NORMAL
      }).join('');
  }
}
