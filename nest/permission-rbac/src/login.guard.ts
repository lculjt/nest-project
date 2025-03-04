import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from './user/entities/role.entity';
import { Reflector } from '@nestjs/core';
declare module 'express' {
  interface Request {
    user: {
      username: string;
      roles: Role[]
    }
  }
}
@Injectable()
export class LoginGuard implements CanActivate {
  
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(Reflector)
  private reflector: Reflector;
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    
    const authorization = request.headers.authorization;

    const requireLogin = this.reflector.getAllAndOverride('require-login', [context.getClass(), context.getHandler()])

    if (!requireLogin) {
      return true; // 公共路径不需要鉴权
    }
    
    if(!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try{
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);
      request.user = data.user;
      return true;
    } catch(e) {
      throw new UnauthorizedException('token 失效，请重新登录');
    }
  }
}