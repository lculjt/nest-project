import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @Inject(DbService)
  private dbService: DbService;

  async register(createUserDto: CreateUserDto) {
    const users: Array<User> = await this.dbService.read();

    const foundUser = users.find(item => item.username === createUserDto.username);

    if(foundUser) {
      throw new BadRequestException('该用户已经注册');
    }

    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    users.push(user);

    await this.dbService.write(users);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: Array<User> = await this.dbService.read();

    const foundUser = users.find(item => item.username === loginUserDto.username && item.password === loginUserDto.password);

    if(!foundUser) {
      throw new BadRequestException('用户名或密码不正确');
    }

    return foundUser;
  }
}
