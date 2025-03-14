import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter'
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
@Module({
  imports: [EventEmitterModule.forRoot({
    wildcard: true, // 允许通配符
    delimiter: '.' // namespace和事件名的分隔符
  }), AaaModule, BbbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
