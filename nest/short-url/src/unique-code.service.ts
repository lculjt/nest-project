import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UniqueCode } from './entities/UniqueCode';
import { EntityManager } from 'typeorm';
import { generateRandomStr } from './utils';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UniqueCodeService {

    @InjectEntityManager()
    private manager: EntityManager;
    
    async generateCode() {
        let str = generateRandomStr(6);

        const uniqueCode = await this.manager.findOneBy(UniqueCode, {
            code: str
        });

        if(!uniqueCode) {
            const code = new UniqueCode();
            code.code = str;
            code.status = 0;

            return await this.manager.insert(UniqueCode, code);
        } else {
            return this.generateCode();
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_4AM)
    async batchGenerateCode() {
        for(let i = 0; i< 10000; i++) {
            this.generateCode();
        }
    }
}
