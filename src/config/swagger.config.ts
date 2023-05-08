import { INestApplication } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

export function setupSwagger(app: INestApplication) {
  const option = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('api-docs', app, document);
}
