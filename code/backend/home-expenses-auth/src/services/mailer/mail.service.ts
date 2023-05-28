import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendWelcomeMail(email: string, verificationCode: string): void {
    this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Home Expenses App. Confirm your Email',
      text: 'Activate your account',
      html: `<p>Go to https://yellow-bush-03266d003.2.azurestaticapps.net/auth/signup-finish and finish registration using your credentials and this code: ${verificationCode}</p>`
    });
  }

  public sendRecoverPasswordMail(email: string, verificationCode: string): void {
    this.mailerService.sendMail({
      to: email,
      subject: 'Reset password for Home Expenses App',
      text: 'Create new password',
      html: `<p>Go to https://yellow-bush-03266d003.2.azurestaticapps.net/auth/forgot-password-finish and reset password using this code: ${verificationCode}</p>`
    });
  }
}
