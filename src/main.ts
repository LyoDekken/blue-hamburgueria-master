import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Hamburgueria Blue')
    .setDescription('API responsavel pela gestão da Hamburgueria da Blue')
    .setVersion('1.0.0')
    .addTag('users')
    .addTag('products')
    .addTag('status')
    .addTag('tables')
    .addTag('categories')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3333);
}
bootstrap();
