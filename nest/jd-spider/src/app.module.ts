import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entites/Job';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "boss-spider",
      synchronize: true,
      logging: true,
      entities: [Job],
      poolSize: 10,
      connectorPackage: 'mysql2',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
