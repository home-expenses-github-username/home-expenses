import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Unknown email format' })
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  passwordHash: string;

  @ApiProperty()
  @IsNotEmpty()
  preview: boolean;

  @ApiProperty({ required: false })
  verificationCodeHash: string;

  @ApiProperty({ required: false })
  refreshTokenHash: string;

  @ApiProperty({ required: false })
  firstName: string;

  @ApiProperty({ required: false })
  secondName: string;

  @ApiProperty({ required: false })
  lastName: string;

  @ApiProperty({ required: false })
  pendingRecover: boolean;
}
