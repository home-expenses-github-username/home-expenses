import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Credentials } from '../../modules/auth/controllers/dto/credentials';
import { UserDbService } from '../../modules/database/user/service/user-db.service';
import { User } from '../../modules/database/user/entity/user';
import { randomUUID } from 'crypto';

@Injectable()
export class MailService {
  constructor(private userDbService: UserDbService, private readonly mailerService: MailerService) {}

  signupStart(credentials: Credentials): Promise<User> {
    credentials.verificationCode = randomUUID();
    this.sendMail(credentials);
    return this.userDbService.createPreview(credentials);
  }

  signupFinish(user: User): Promise<User> {
    return this.userDbService.activate(user);
  }

  sendMail(credentials: Credentials): void {
    this.mailerService.sendMail({
      to: credentials.email,
      subject: 'Welcome to Home Expenses App. Confirm your Email',
      text: 'Activate your account',
      html: `<p>Go to https://yellow-bush-03266d003.2.azurestaticapps.net/auth/signup-finish and finish registration using your credentials and this code: ${credentials.verificationCode}</p>`
    });
  }
}
