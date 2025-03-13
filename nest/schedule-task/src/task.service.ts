import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
    @Cron(CronExpression.EVERY_5_SECONDS, {
        name: 'task1',
        timeZone: 'Asia/shanghai',
    })
    handleCron() {
        console.log('TaskService.handleCron')
    }

    @Interval('task2', 200)
    handleInterval() {
        console.log('TaskService.handleInterval')
    }

    @Timeout('task3', 3000)
    handleTimeout() {
        console.log('TaskService.handleTimeout')
    }
}
