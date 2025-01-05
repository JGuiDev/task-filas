import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskProcessor } from './queues/task.processor';
import { SendEmailProcessor } from 'src/jobs/send-email.processor';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskProcessor: TaskProcessor,
    private readonly sendEmailProcessor: SendEmailProcessor,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);

     await this.taskProcessor.addTask(createTaskDto);
     await this.taskRepository.save(task);
    return task;
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
