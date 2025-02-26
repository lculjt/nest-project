import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  async findAll() {
    return await this.cityService.findAll();
  }

  @Get('root')
  async findRootCities() {
    return await this.cityService.findRootCities();
  }

  @Get('children')
  async getAllChildren(@Query('id') id: number) {
    return await this.cityService.findAllChildrenById(id);
  }

  @Get('ancestors')
  async getAllAncestors(
    @Query('id') id: number,
    @Query('flat') flat: boolean = false,
  ) {
    return await this.cityService.findAllAncestorsById(id, flat);
  }
}
