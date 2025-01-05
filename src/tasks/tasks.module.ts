import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskProcessor } from './queues/task.processor';
import { TaskConsumer } from './queues/task.consumer';

import { BullModule } from '@nestjs/bullmq';
import { SendEmailProcessor } from 'src/jobs/send-email.processor';
import { SendEmailConsumer } from 'src/jobs/send-email.consumer';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    BullModule.registerQueue({ name: 'task-queue' }),
    BullModule.registerQueue({ name: 'send-email-queue' }),
    BullBoardModule.forFeature({
      name: 'task-queue',
      adapter: BullMQAdapter,
    }),
    BullBoardModule.forFeature({
      name: 'send-email-queue',
      adapter: BullMQAdapter,
    }),

  ],
  controllers: [TasksController],
  providers: [TasksService, TaskProcessor, TaskConsumer, SendEmailProcessor, SendEmailConsumer],
})
export class TasksModule {}
