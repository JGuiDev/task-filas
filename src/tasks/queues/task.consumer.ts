import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Job } from 'bullmq';
import { SendEmailProcessor } from 'src/jobs/send-email.processor';

@Processor('task-queue')
export class TaskConsumer extends WorkerHost {
  constructor(private readonly sendEmailProcessor: SendEmailProcessor) {
    super();
  }

  async process(job: Job<CreateTaskDto>): Promise<any> {
    console.log('Processando job', job.data);

    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulando a bagaça do job

    console.log('Job finalizado', job.data);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job): void {
    console.log('Job saiu da fila', job.id);
  }
}
