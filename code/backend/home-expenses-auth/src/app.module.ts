/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
 */

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { userProviders } from './database/user/user.provider';
import { mailerOptions } from './services/mailer/mail.google.settings';
import { MailerModule } from '@nestjs-modules/mailer';
import { TestService } from './services/test/test.service';
import { MailService } from './services/mailer/mail.service';
import { UserDbService } from './database/user/service/user-db.service';
import { TestController } from './controllers/test/test.controller';
import { UserController } from './controllers/user/user.controller';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [DatabaseModule, MailerModule.forRoot(mailerOptions)],
  controllers: [TestController, UserController, AuthController],
  providers: [UserDbService, ...userProviders, MailService, TestService]
})
export class AppModule {}
