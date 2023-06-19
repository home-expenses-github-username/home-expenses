/*
 * Author: Vladimir Vysokomornyi
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
import { expenseProviders } from './modules/database/expense/expense.provider';
import { ExpenseController } from './controllers/expense/expense.controller';
import { ExpenseDbService } from './modules/database/expense/service/expense-db.service';

@Module({
  imports: [DatabaseModule, MailerModule.forRoot(mailerOptions), AuthModule],
  controllers: [TestController, UserController, ExpenseController],
  providers: [UserDbService, ExpenseDbService, ...userProviders, ...expenseProviders, TestService]
})
export class AppModule {}
