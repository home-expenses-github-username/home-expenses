export class Credentials {
  email: string;
  password: string;
  verificationCode?: string;
}

export class ResetPasswordCredentials {
  oldPassword: string;
  newPassword: string;
}

export class ForgotCredentials {
  email: string;
}

export class RecoverCredentials {
  email: string;
  newPassword: string;
  verificationCode: string;
}
