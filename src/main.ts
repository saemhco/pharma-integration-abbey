import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { static as expose } from "express";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(expose('public'));
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                    // Ignorar datos que no esten en los DTO
      forbidNonWhitelisted: true,         // Lanzar error si existen datos prohibidos
      disableErrorMessages: false,         // Desabilitar mensajes de error (producción)
      // transformOptions: {
      //   enableImplicitConversion: true,   // Habilitar conversion implicita
      // },
    })
  );


  const config = new DocumentBuilder()
    .setTitle('API DOCUMENTATION')
    .setDescription('API integration APP')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get('app.docs'), app, document, {
    explorer: true,
    swaggerOptions: {
      //docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  console.log('PORT: ' + configService.get('app.port'));
  console.log('APP_ENVIRONMENT: ' + process.env.APP_ENVIRONMENT);
  await app.listen(configService.get('app.port'));
}
bootstrap();
