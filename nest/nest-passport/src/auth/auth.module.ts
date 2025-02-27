import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
