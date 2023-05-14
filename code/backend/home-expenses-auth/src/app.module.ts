/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserDbService } from './database/user/service/user-db.service';
import { userProviders } from './database/user/user.provider';
import { UserController } from './user/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserDbService, ...userProviders]
})
export class AppModule {}
