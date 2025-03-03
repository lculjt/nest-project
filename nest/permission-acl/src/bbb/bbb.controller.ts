import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { LoginGuard } from 'src/login.guard';
import { PermissionGuard } from 'src/user/permission.guard';

@Controller('bbb')
export class BbbController {
  constructor(private readonly bbbService: BbbService) {}

  @Get()
  @UseGuards(LoginGuard, PermissionGuard)
  @SetMetadata('permission', 'query_bbb')
  getHello(): string {
    return 'bbb'
  }
}
