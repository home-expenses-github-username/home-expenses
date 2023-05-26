import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';

export const mailerOptions: MailerOptions = {
  transport: {
    host: '__MAIL_SMTP_SERVICE__',
    auth: {
      user: '__MAIL_USER__',
      pass: '__MAIL_USER_PASSWORD__'
    }
  },
  defaults: {
    from: '"home-expenses" <noreply@home.expenses.com>'
  }
};
