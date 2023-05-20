import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';

export const mailerOptions: MailerOptions = {
  transport: {
    host: 'mail-smtp-service-in-KeyVault',
    auth: {
      user: 'mail-user-in-KeyVault',
      pass: 'mail-user-password-in-KeyVault'
    }
  },
  defaults: {
    from: '"home-expenses" <noreply@home.expenses.com>'
  }
};
