import {OnWorkerEvent, Processor, WorkerHost} from   '@nestjs/bullmq';

@Processor('send-email-queue')
export class SendEmailConsumer extends WorkerHost{

  async process(job){
    console.log('Processando o envio de email', job.data);
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('Email enviado', job.id);
  }

  @OnWorkerEvent('completed')
  onCompleted(job){
    console.log('Email enviado com sucesso', job.data);
  }
}