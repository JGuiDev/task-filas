import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable() // Decorator de injeção de dependência
export class SendEmailProcessor{
  constructor(@InjectQueue('send-email-queue') private readonly sendEmailProcessor: Queue){} //Injeção de dependências

  async sendEmail(to: string, subject: string, body: string){
    console.log('Enviando email a fila....');
    await this.sendEmailProcessor.add('send-email', {to, subject, body}, {delay: 5000});
  }
}