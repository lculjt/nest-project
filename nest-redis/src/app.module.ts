import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createClient } from 'redis';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(){
        const client = createClient({ 
          url: 'redis://localhost:6370'
          // socket: {
          //   host: 'localhost',
          //   port: 6370
          // }
        });
        await client.connect();
        return client;
      }
    }
  ],
})
export class AppModule {}
