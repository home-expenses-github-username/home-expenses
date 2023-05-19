import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Mail } from '../../controllers/mail/dto/mail';
import { User } from './user';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  send(mail: Mail): void {
    const { to, from, subject, text, html } = mail;
    this.mailerService
      .sendMail({
        to,
        from,
        subject,
        text,
        html
        // to: 'unlimit_rmc@mail.ru', // list of receivers
        // from: 'noreply@home.expenses.com', // sender address
        // subject: 'Testing Nest MailerModule ✔', // Subject line
        // text: 'welcome', // plaintext body
        // html: '<b>welcome</b>' // HTML body content
      })
      .then((success) => {
        // console.log(success);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  async sendUserConfirmation(user: User, token: string): Promise<any> {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      // template: './confirmation', // `.hbs` extension is appended automatically
      // context: {
      //   // ✏️ filling curly brackets with content
      //   name: user.name,
      //   url
      // }
      text: 'welcome 2',
      html: '<h1>welcome 2</h1>'
    });
  }

  sendMail(): void {
    this.mailerService.sendMail({
      to: 'vladimir.vysokomornyi@gmail.com',
      from: 'unlimitgo@gmail.com>',
      subject: 'Welcome to Nice App! Confirm your Email',
      text: 'welcome',
      html: '<b>welcome via html</b>'
    });
  }
}
