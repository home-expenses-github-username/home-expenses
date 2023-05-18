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
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './services/mailer/mail.service';
import { MailController } from './controllers/mail/mail.controller';

@Module({
  imports: [
    DatabaseModule,
    MailerModule.forRoot({
      // transport: 'smtp://user@example.com:topsecret@smtp.example.com:1025',
      // transport: {
      //   host: 'localhost',
      //   port: 1025,
      //   ignoreTLS: true,
      //   secure: false
      // },
      // transport: {
      //   host: 'smtp.example.com',
      //   ignoreTLS: true,
      //   // host: 'localhost',
      //   // port: 1025,
      //   secure: false, // true for 465, false for other ports
      //   auth: {
      //     user: 'user@example.com', // generated ethereal user
      //     pass: 'topsecret' // generated ethereal password
      //   }
      // },
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'home.expenses.user@gmail.com',
          pass: ''
        }
      },
      defaults: {
        from: '"nest-modules" <noreply@example.com>'
      }
      // template: {
      //   // dir: __dirname + '/templates',
      //   dir: __dirname + '/templates',
      //   adapter: new PugAdapter(),
      //   options: {
      //     strict: true
      //   }
      // }
    })
  ],
  controllers: [AppController, UserController, MailController],
  providers: [AppService, UserDbService, ...userProviders, MailService]
})
export class AppModule {}
