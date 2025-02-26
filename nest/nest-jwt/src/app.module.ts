import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    // JwtModule.register({
    //   secret: 'my-secret',
    //   signOptions: { expiresIn: '1d' },
    // })
    JwtModule.registerAsync({
      async useFactory() {
        await 111;
        return {
          secret: 'my-secret',
          signOptions: { expiresIn: '1d' },
        };
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
