import { Inject, Injectable } from '@nestjs/common';
import { UniqueCodeService } from './unique-code.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UniqueCode } from './entities/UniqueCode';
import { ShortLongMap } from './entities/ShortLongMap';

@Injectable()
export class ShortLongMapService {
    @Inject(UniqueCodeService)
    private uniqueCodeService: UniqueCodeService;

    @InjectEntityManager()
    private manager: EntityManager;

    async generateShortUrl(longUrl: string) {
        let uniqueCode = await this.manager.findOne(UniqueCode, {
            where: {
                status: 0
            }
        })  
        uniqueCode ||= this.uniqueCodeService.generateCode(); 

        const map = new ShortLongMap();
        map.shortUrl = uniqueCode.code;
        map.longUrl = longUrl;

        await this.manager.insert(ShortLongMap, map);
        await this.manager.update(UniqueCode, {
            id: uniqueCode.id
        }, {
            status: 1,
        })

        return uniqueCode.code
    }

    async getLongUrl(code: string) {
        const map = await this.manager.findOneBy(ShortLongMap, {
            shortUrl: code
        });
        console.log('map', map)
        if(!map) {
            return null;
        }
        return map.longUrl;
    }
}
