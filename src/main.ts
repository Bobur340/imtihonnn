import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  
  const config = new DocumentBuilder()
    .setTitle('Cyber Shop API')
    .setDescription('Cyber Shop project uchun API hujjatlari')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('Server running: http://localhost:3000');
  console.log('Swagger docs: http://localhost:3000/api/docs');
}
bootstrap();