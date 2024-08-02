import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Tasks microservice')
    .setDescription('Microservice to manage tasks')
    .setVersion('0.0.1')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('documentation', app, document, {
    jsonDocumentUrl: 'documentation/json',
    useGlobalPrefix: true,
  });

  await app.listen(8080);
}

bootstrap();
