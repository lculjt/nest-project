import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "login_register_test",
        synchronize: true,
        logging: true,
        entities: [User],
        poolSize: 10,
        connectorPackage: 'mysql2',
    }), 
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: {
        expiresIn: '1d'
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
