/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
  await app.listen(3000);
}
bootstrap();
