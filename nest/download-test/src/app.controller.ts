import { Controller, Get, Res, Header, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('download')
  @Header('Content-Disposition', `attachment; filename="page.json"`)
  download(@Res() res: Response) {
    const content = fs.readFileSync('package.json');

    res.end(content);
  }

  @Get('stream-download')
  @Header('Content-Disposition', `attachment; filename="page.json"`)
  streamDownload(@Res() res: Response) {
    const steam = fs.createReadStream('package.json');

    steam.pipe(res);
  }

  @Get('download3')
  download3(@Res({ passthrough: true }) res: Response) {
    const filePath = join(__dirname, './public/image.png',);
    try {
      const fileStream = fs.createReadStream(filePath);

      res.set({
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="image.png"`,
      });

      return new StreamableFile(fileStream);
    } catch (error) {
      res.status(404).send('File not found');
    }
}
}
