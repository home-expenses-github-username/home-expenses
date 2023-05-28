import { BadRequestException, Body, Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MailService } from '../../../services/mailer/mail.service';
import { Credentials } from './dto/credentials';
import { UserDbService } from '../../database/user/service/user-db.service';
import {
  ACTIVATION_USER_IS_ALREADY_DONE,
  ALREADY_REGISTERED_ERROR,
  AUTH_ACCESS_DENIED,
  AUTH_REFRESH_TOKEN_ERROR,
  EXPECTED_ACTIVATION_ERROR,
  USER_NOT_FOUND_ERROR,
  VERIFICATION_CODE_ERROR,
  WRONG_PASSWORD_ERROR
} from '../../database/user/user.constants';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AUTH_ACCESS_TOKEN_SECRET, AUTH_REFRESH_TOKEN_SECRET } from '../../../config/auth';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { User } from '../../database/user/entity/user';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private mailService: MailService, private userDbService: UserDbService, private jwtService: JwtService) {}

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

    const isCorrectPassword = await argon.verify(existedUser.passwordHash, credentials.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    const isCorrectVerificationCode = await argon.verify(
      existedUser.verificationCodeHash,
      credentials.verificationCode
    );
    if (!isCorrectVerificationCode) {
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

    const isCorrectPassword = await argon.verify(existedUser.passwordHash, credentials.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    const newTokens = this.getTokens(existedUser);
    await this.userDbService.updateRefreshToken(existedUser, newTokens.refresh_token);
    return newTokens;
  }

  private getTokens(existedUser: User) {
    return {
      access_token: this.jwtService.sign(
        {
          email: existedUser.email
        },
        {
          secret: AUTH_ACCESS_TOKEN_SECRET,
          expiresIn: '1m'
        }
      ),
      refresh_token: this.jwtService.sign(
        {
          email: existedUser.email
        },
        {
          secret: AUTH_REFRESH_TOKEN_SECRET,
          expiresIn: '5m'
        }
      )
    };
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(@Req() req: Request) {
    const existedUser = await this.userDbService.findUser(req.user['email']);
    if (!existedUser || !existedUser.refreshTokenHash) {
      throw new UnauthorizedException(AUTH_ACCESS_DENIED);
    }

    const isCorrectRefreshToken = await argon.verify(existedUser.refreshTokenHash, req.user['refreshToken']);
    if (!isCorrectRefreshToken) {
      throw new UnauthorizedException(AUTH_REFRESH_TOKEN_ERROR);
    }

    const newTokens = this.getTokens(existedUser);
    await this.userDbService.updateRefreshToken(existedUser, newTokens.refresh_token);
    return newTokens;
  }
}
