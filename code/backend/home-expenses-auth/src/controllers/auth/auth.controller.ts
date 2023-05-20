import { BadRequestException, Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { MailService } from '../../services/mailer/mail.service';
import { Credentials } from './dto/credentials';
import { UserDbService } from '../../database/user/service/user-db.service';
import {
  ACTIVATION_USER_IS_ALREADY_DONE,
  ALREADY_REGISTERED_ERROR,
  EXPECTED_ACTIVATION_ERROR,
  USER_NOT_FOUND_ERROR,
  VERIFICATION_CODE_ERROR,
  WRONG_PASSWORD_ERROR
} from '../../database/user/user.constants';
import { compare } from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(private mailService: MailService, private userDbService: UserDbService) {}

  @Post('signup-start')
  async signupStart(@Body() credentials: Credentials) {
    const isExisted = await this.userDbService.findUser(credentials.email);
    if (isExisted) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return this.mailService.signupStart(credentials);
  }

  @Post('signup-finish')
  async signupFinish(@Body() credentials: Credentials) {
    const existedUser = await this.userDbService.findUser(credentials.email);
    if (!existedUser) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    if (!existedUser.preview) {
      throw new UnauthorizedException(ACTIVATION_USER_IS_ALREADY_DONE);
    }

    const isCorrectPassword = await compare(credentials.password, existedUser.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    if (existedUser.verificationCode !== credentials.verificationCode) {
      throw new UnauthorizedException(VERIFICATION_CODE_ERROR);
    }

    return this.mailService.signupFinish(existedUser);
  }

  @Post('signin')
  async signin(@Body() credentials: Credentials) {
    const existedUser = await this.userDbService.findUser(credentials.email);
    if (!existedUser) {
      throw new BadRequestException(USER_NOT_FOUND_ERROR);
    }

    if (existedUser.preview) {
      throw new UnauthorizedException(EXPECTED_ACTIVATION_ERROR);
    }

    const isCorrectPassword = await compare(credentials.password, existedUser.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return existedUser;
  }
}
