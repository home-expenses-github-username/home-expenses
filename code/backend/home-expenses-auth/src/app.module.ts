/*
 * Copyright (C) Vladimir Vysokomornyi
 * All Rights Reserved.
 */

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserDbService } from './database/user/service/user-db.service';
import { userProviders } from './database/user/user.provider';
import { UserController } from './user/user.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './services/mailer/mail.service';
import { MailController } from './controllers/mail/mail.controller';
import { TestService } from './services/test/test.service';
import { TestController } from './controllers/test/test.controller';
import { mailerOptions } from './services/mailer/mail.google.settings';

@Module({
  imports: [DatabaseModule, MailerModule.forRoot(mailerOptions)],
  controllers: [UserController, MailController, TestController],
  providers: [UserDbService, ...userProviders, MailService, TestService]
})
export class AppModule {}
