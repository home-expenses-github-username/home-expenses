export class User {
  id?: number;
  email: string;
  passwordHash: string;
  preview: boolean;
  verificationCode: string;
}
