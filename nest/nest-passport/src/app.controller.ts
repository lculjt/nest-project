import { Controller, Get, Post, Req, UseGuards, Inject, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { IsPublic } from './is-public.decorator';

interface JwtUserData {
  userId: number;
  username: string;
}

declare module 'express' {
  interface Request {
    user: JwtUserData
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Inject(JwtService)
  private jwtService: JwtService;

  @UseGuards(AuthGuard('local'))
  @IsPublic()
  @Post('login')
  async login(@Req() req: Request) {
    const token = this.jwtService.sign({
      userId: req.user.userId,
      username: req.user.username
    }, {
      expiresIn: '0.5h'
    });

    return {
      token
    }
  }

  @Get('github/login')
  @IsPublic()
  @UseGuards(AuthGuard('github'))
  githubLogin() {

  }

  @Get('callback')
  @IsPublic()
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req) {
    console.log(req.user);
    return req.user;
  }

  @Get('google')
  @IsPublic()
  @UseGuards(AuthGuard('google'))
  async googleAuth() { }

  @Get('callback/google')
  @UseGuards(AuthGuard('google'))
  @Redirect('/aaa')
  @IsPublic()
  googleAuthRedirect(@Req() req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("list")
  list(@Req() req: Request) {
    console.log(req.user);
    return ['111', '222', '333', '444', '555']
  }

  @IsPublic()
  @Get('aaa')
  aaa() {
    return 'aaa';
  }

  @Get('bbb')
  bbb() {
    return 'bbb';
  }
}
