import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.session.user;
    if(!user) {
      throw new UnauthorizedException('用户未登录');
    }

    const foundUser = await this.userService.findByUsername(user.username);

    const permission = this.reflector.get('permission', context.getHandler());


    if(foundUser.permissions.some(item => item.name === permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问该接口');
    }
  }
}
