import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from './winston/winston.module';
import 'winston-daily-rotate-file';
import * as chalk from 'chalk';
import {format, transports } from 'winston';
@Module({
  imports: [WinstonModule.forRoot({
    level: 'debug',
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(({context, level, message, time}) => {
                    const appStr = chalk.green(`[NEST]`);
                    const contextStr = chalk.yellow(`[${context}]`);

                    return `${appStr} ${time} ${level} ${contextStr} ${message} `;
                })
            )
        }),
        // new transports.File({
        //     format: format.combine(
        //         format.timestamp(),
        //         format.json()
        //     ),
        //     filename: 'test.log',
        //     dirname: 'log'
        // }),
        new transports.DailyRotateFile({
          format: format.combine(
            format.timestamp(),
            format.json()
          ),
          dirname: 'log',
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          maxSize: '20m',
          maxFiles: '1d'
        })
    ]
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
