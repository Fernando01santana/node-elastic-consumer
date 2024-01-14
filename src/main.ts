import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Use NestFactory.create() for standard HTTP server

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI],
      noAck: false,
      queue: process.env.RABBIRMQ_QUEUE_NAME,
    },
  });

  app.useLogger(new Logger('NestApplication'));
  await app.startAllMicroservices(); // Inicia o Microserviço
  await app.listen(3005, () => {
    console.log('Application listening on 3005');
  });
}
bootstrap();
