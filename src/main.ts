import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Importe o SwaggerModule e o DocumentBuilder
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurações do Swagger
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API Description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URI],
      noAck: false,
      queue: process.env.RABBIRMQ_QUEUE_NAME,
    },
  });

  app.useLogger(new Logger('NestApplication'));
  await app.startAllMicroservices();
  await app.listen(3005, () => {
    console.log('Application listening on 3005');
  });
}
bootstrap();
