/*
 * Author: Vladimir Vysokomornyi
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  // app.enableCors({
  //   // allowedHeaders: ['content-type'],
  //   methods: ['GET', 'POST', 'DELETE'],
  //   origin: 'https://local.home-expenses.com:8443',
  //   // credentials: true
  // });

  const config = new DocumentBuilder()
    .setTitle('Home Expenses API')
    .setDescription('The Home Expenses API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { swaggerOptions: { tagsSorter: 'alpha' } });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
