import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [UserModule,JwtModule.register({
    global: true,
    signOptions: {
      expiresIn: '10s'
    },
    secret: 'secret'
  }), TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "refresh_token_test",
    synchronize: true,
    logging: true,
    entities: [User],
    poolSize: 10,
    connectorPackage: 'mysql2',

  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
