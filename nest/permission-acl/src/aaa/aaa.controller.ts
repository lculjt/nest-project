import { Controller, Get, UseGuards } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { LoginGuard } from 'src/login.guard';

@Controller('aaa')
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Get()
  @UseGuards(LoginGuard)
  getHello(): string {
    return 'aaa'
  }
}
