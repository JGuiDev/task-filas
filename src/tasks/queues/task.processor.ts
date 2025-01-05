import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TaskProcessor {
  constructor(@InjectQueue('task-queue') private readonly taskQueue: Queue) {}
  async addTask(task: CreateTaskDto) {
    console.log('Adicionando task', task);
    const job = await this.taskQueue.add('task', task,{delay: 5000});
    console.log('Task adicionada', job.id);

    return job
  }
}
