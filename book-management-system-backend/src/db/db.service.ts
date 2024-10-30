import { Injectable, Inject } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, writeFile, readFile } from 'fs/promises';
@Injectable()
export class DbService {
    @Inject('OPTIONS')
    private options: DbModuleOptions;

    async write(obj: Record<string, any>) {
        await writeFile(this.options.path, JSON.stringify(obj || {}), {
            encoding: "utf-8"
        })
    }

    async read() {
        try {
            await access(this.options.path);
            return JSON.parse(await readFile(this.options.path, { encoding: "utf-8" })) || [];
        } catch (error) {
            return [];
        }
    }
}
