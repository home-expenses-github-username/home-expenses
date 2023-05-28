/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
 */

import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { userProviders } from './modules/database/user/user.provider';
import { mailerOptions } from './config/mail';
import { MailerModule } from '@nestjs-modules/mailer';
import { TestService } from './services/test/test.service';
import { UserDbService } from './modules/database/user/service/user-db.service';
import { TestController } from './controllers/test/test.controller';
import { UserController } from './controllers/user/user.controller';

import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, MailerModule.forRoot(mailerOptions), AuthModule],
  controllers: [TestController, UserController],
  providers: [UserDbService, ...userProviders, TestService]
})
export class AppModule {}
