import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule.register({
    global: true,
    timeout: 5000, 
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
