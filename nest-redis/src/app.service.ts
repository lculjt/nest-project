import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class AppService {

  @Inject('REDIS_CLIENT')
  private client: RedisClientType;

  async getHello() {
    return this.client.keys('*');
  }
}
