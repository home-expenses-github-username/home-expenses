import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Credentials } from '../../controllers/auth/dto/credentials';
import { UserDbService } from '../../database/user/service/user-db.service';
import { User } from '../../database/user/entity/user';
import { randomUUID } from 'crypto';

@Injectable()
export class MailService {
  constructor(private userDbService: UserDbService, private readonly mailerService: MailerService) {}

  // send(mail: Mail): void {
  //   const { to, from, subject, text, html } = mail;
  //   this.mailerService
  //     .sendMail({
  //       to,
  //       from,
  //       subject,
  //       text,
  //       html
  //       // to: 'unlimit_rmc@mail.ru', // list of receivers
  //       // from: 'noreply@home.expenses.com', // sender address
  //       // subject: 'Testing Nest MailerModule ✔', // Subject line
  //       // text: 'welcome', // plaintext body
  //       // html: '<b>welcome</b>' // HTML body content
  //     })
  //     .then((success) => {
  //       // console.log(success);
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //     });
  // }

  // async sendUserConfirmation(user: User, token: string): Promise<any> {
  //   // const url = `example.com/auth/confirm?token=${token}`;
  //
  //   await this.mailerService.sendMail({
  //     to: user.email,
  //     from: '"Support Team" <support@example.com>', // override default from
  //     subject: 'Welcome to Nice App! Confirm your Email',
  //     // template: './confirmation', // `.hbs` extension is appended automatically
  //     // context: {
  //     //   // ✏️ filling curly brackets with content
  //     //   name: user.name,
  //     //   url
  //     // }
  //     text: 'welcome 2',
  //     html: '<h1>welcome 2</h1>'
  //   });
  // }

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
      // from: 'unlimitgo@gmail.com',
      subject: 'Welcome to Home Expenses App. Confirm your Email',
      text: 'Activate your account',
      html: `<p>Go to https://local.home-expenses.com:8443/signup-activate and finish registration using your credentials and this code: ${credentials.verificationCode}</p>`
    });
  }
}
