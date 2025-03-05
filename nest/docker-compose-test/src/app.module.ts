import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aaa } from './aaa.entity';
import { createClient } from 'redis';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "172.25.102.6",
    port: 3306,
    username: "root",
    password: "root",
    database: "aaa",
    synchronize: true,
    logging: true,
    entities: [Aaa],
    poolSize: 10,
    connectorPackage: 'mysql2',

  })],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'REDIS_CLIENT',
    async useFactory() {
      const client = createClient({
          socket: {
              host: '172.25.102.6',
              port: 6370
          }
      });
      await client.connect();
      return client;
    }
  }
  ],
})
export class AppModule {}
