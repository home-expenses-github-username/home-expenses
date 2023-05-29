import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  verificationCode?: string;
}

export class ResetPasswordCredentialsDto {
  @ApiProperty()
  oldPassword: string;

  @ApiProperty()
  newPassword: string;
}

export class ForgotCredentialsDto {
  @ApiProperty()
  email: string;
}

export class RecoverCredentialsDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  newPassword: string;

  @ApiProperty()
  verificationCode: string;
}
