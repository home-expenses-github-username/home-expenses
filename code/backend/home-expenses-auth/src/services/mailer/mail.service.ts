import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Credentials } from '../../controllers/auth/dto/credentials';
import { UserDbService } from '../../database/user/service/user-db.service';
import { User } from '../../database/user/entity/user';
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
      html: `<p>Go to https://local.home-expenses.com:8443/signup-activate and finish registration using your credentials and this code: ${credentials.verificationCode}</p>`
    });
  }
}
