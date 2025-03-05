import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;

  async findUserById(userId: number) {
    return await this.manager.findOne(User, {
        where: {
            id: userId
        }
    });
}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.manager.findOne(User, {
        where: {
            username: loginUserDto.username
        }
    });

    if(!user) {
        throw new HttpException('用户不存在', HttpStatus.OK);
    }

    if(user.password !== loginUserDto.password) {
        throw new HttpException('密码错误', HttpStatus.OK);
    }

    return user;
}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
