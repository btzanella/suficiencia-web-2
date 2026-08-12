import 'reflect-metadata';
import { NestFactory } from '@nestjs/core/nest-factory';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // Ativa o @Type()
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API WEB 2 - SUFICIÊNCIA')
    .setDescription('API para o controle dos equipamentos da FURB')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'TOKEN',
        in: 'header',
      },
      'acess-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
