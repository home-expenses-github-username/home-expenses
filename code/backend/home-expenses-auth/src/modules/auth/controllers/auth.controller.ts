import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { MailService } from '../../../services/mailer/mail.service';
import {
  CredentialsDto,
  ForgotCredentialsDto,
  RecoverCredentialsDto,
  ResetPasswordCredentialsDto
} from './dto/credentials';
import { UserDbService } from '../../database/user/service/user-db.service';
import {
  ACTIVATION_USER_IS_ALREADY_DONE,
  ALREADY_REGISTERED_ERROR,
  AUTH_ACCESS_DENIED,
  AUTH_FORGOT_PASSWORD_PENDING_ERROR,
  AUTH_CHANGE_POLICY_PASSWORD_ERROR,
  AUTH_REFRESH_TOKEN_ERROR,
  EXPECTED_ACTIVATION_ERROR,
  USER_NOT_FOUND_ERROR,
  VERIFICATION_CODE_ERROR,
  WRONG_PASSWORD_ERROR
} from '../../database/user/user.constants';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import {
  AUTH_ACCESS_TOKEN_EXPIRATION,
  AUTH_ACCESS_TOKEN_SECRET,
  AUTH_REFRESH_TOKEN_EXPIRATION,
  AUTH_REFRESH_TOKEN_SECRET
} from '../../../config/auth';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { User } from '../../database/user/entity/user';
import { Request } from 'express';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { randomUUID } from 'crypto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { Tokens } from '../interfaces/tokens';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private mailService: MailService, private userDbService: UserDbService, private jwtService: JwtService) {}

  @ApiOperation({ summary: 'Start signup process', description: "Don't need to provide any Bearer token here" })
  @ApiOkResponse({ description: 'The user signup process is successfully started' })
  @ApiBadRequestResponse({ description: 'Error during signup start process' })
  @HttpCode(200)
  @Post('signup-start')
  async signupStart(@Body() credentials: CredentialsDto) {
    const isExisted = await this.userDbService.findUser(credentials.email);
    if (isExisted) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    const verificationCode = randomUUID();
    this.mailService.sendWelcomeMail(credentials.email, verificationCode);
    return this.userDbService.createPreview(credentials);
  }

  @ApiOperation({ summary: 'Finish signup process', description: "Don't need to provide any Bearer token here" })
  @ApiOkResponse({ description: 'The user signup process is successfully finished' })
  @ApiUnauthorizedResponse({ description: 'Error during signup finish process' })
  @HttpCode(200)
  @Post('signup-finish')
  async signupFinish(@Body() credentials: CredentialsDto) {
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

    return this.userDbService.activate(existedUser);
  }

  @ApiOperation({ summary: 'Signin using login/password', description: "Don't need to provide any Bearer token here" })
  @ApiOkResponse({ description: 'The user signin process is successfully finished' })
  @ApiBadRequestResponse({ description: 'Error during signin process' })
  @ApiUnauthorizedResponse({ description: 'Error during signin process' })
  @HttpCode(200)
  @Post('signin')
  async signin(@Body() credentials: CredentialsDto) {
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

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sign out', description: 'Use access token as Bearer during signing out' })
  @ApiOkResponse({ description: 'User is signed out' })
  @ApiUnauthorizedResponse({ description: 'Error during sign out' })
  @ApiBadRequestResponse({ description: 'Error during  sign out' })
  @Get('signout')
  async signout(@Req() req: Request): Promise<true> {
    const email = req.user['email'];
    const existedUser = await this.userDbService.findUser(email);
    if (!existedUser) {
      throw new BadRequestException(USER_NOT_FOUND_ERROR);
    }

    if (existedUser.preview) {
      throw new UnauthorizedException(EXPECTED_ACTIVATION_ERROR);
    }

    await this.userDbService.updateRefreshToken(existedUser, null);
    return true;
  }

  @ApiOperation({ summary: 'Recover password via email', description: "Don't need to provide any Bearer token here" })
  @ApiOkResponse({ description: 'Forgot password process is successfully started' })
  @ApiBadRequestResponse({ description: 'Error during starting forgot password process' })
  @ApiUnauthorizedResponse({ description: 'Error during starting forgot password process' })
  @HttpCode(200)
  @Post('forgot-password-start')
  async forgotPasswordStart(@Body() credentials: ForgotCredentialsDto) {
    const existedUser = await this.userDbService.findUser(credentials.email);
    if (!existedUser) {
      throw new BadRequestException(USER_NOT_FOUND_ERROR);
    }

    if (existedUser.preview) {
      throw new UnauthorizedException(EXPECTED_ACTIVATION_ERROR);
    }

    const verificationCode = randomUUID();
    this.mailService.sendRecoverPasswordMail(existedUser.email, verificationCode);
    return this.userDbService.pendingRecover(existedUser, verificationCode);
  }

  @ApiOperation({
    summary: 'Finish recover password process',
    description: "Don't need to provide any Bearer token here"
  })
  @ApiOkResponse({ description: 'Forgot password process is successfully finished' })
  @ApiUnauthorizedResponse({ description: 'Error during finishing forgot password process' })
  @HttpCode(200)
  @Post('forgot-password-finish')
  async forgotPasswordFinish(@Body() newCredentials: RecoverCredentialsDto) {
    const existedUser = await this.userDbService.findUser(newCredentials.email);
    if (!existedUser) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    if (existedUser.preview) {
      throw new UnauthorizedException(ACTIVATION_USER_IS_ALREADY_DONE);
    }

    if (!existedUser.pendingRecover) {
      throw new UnauthorizedException(AUTH_FORGOT_PASSWORD_PENDING_ERROR);
    }

    const isCorrectVerificationCode = await argon.verify(
      existedUser.verificationCodeHash,
      newCredentials.verificationCode
    );
    if (!isCorrectVerificationCode) {
      throw new UnauthorizedException(VERIFICATION_CODE_ERROR);
    }

    return this.userDbService.finishRecover(existedUser, newCredentials.newPassword);
  }

  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reset password', description: 'Use access token as Bearer during password reset' })
  @ApiOkResponse({ description: 'Reset password process is successfully done' })
  @ApiUnauthorizedResponse({ description: 'Error during reset password process' })
  @ApiBadRequestResponse({ description: 'Error during reset password process' })
  @HttpCode(200)
  @Post('reset-password')
  async resetPassword(@Req() req: Request, @Body() credentials: ResetPasswordCredentialsDto) {
    const email = req.user['email'];
    const existedUser = await this.userDbService.findUser(email);
    if (!existedUser) {
      throw new BadRequestException(USER_NOT_FOUND_ERROR);
    }

    if (existedUser.preview) {
      throw new UnauthorizedException(EXPECTED_ACTIVATION_ERROR);
    }

    const isCorrectPassword = await argon.verify(existedUser.passwordHash, credentials.oldPassword);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    if (credentials.oldPassword === credentials.newPassword) {
      throw new UnauthorizedException(AUTH_CHANGE_POLICY_PASSWORD_ERROR);
    }

    const newTokens = this.getTokens(existedUser);
    await this.userDbService.updatePassword(existedUser, credentials.newPassword, newTokens.refresh_token);
    return newTokens;
  }

  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Refresh access and refresh tokens',
    description: 'Use refresh token as Bearer during refreshing both tokens'
  })
  @ApiCreatedResponse({ description: 'New access and refresh tokens are successfully created' })
  @ApiUnauthorizedResponse({ description: 'Error during refresh tokens process' })
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

  private getTokens(existedUser: User): Tokens {
    return {
      access_token: this.jwtService.sign(
        {
          email: existedUser.email
        },
        {
          secret: AUTH_ACCESS_TOKEN_SECRET,
          expiresIn: AUTH_ACCESS_TOKEN_EXPIRATION
        }
      ),
      refresh_token: this.jwtService.sign(
        {
          email: existedUser.email
        },
        {
          secret: AUTH_REFRESH_TOKEN_SECRET,
          expiresIn: AUTH_REFRESH_TOKEN_EXPIRATION
        }
      )
    };
  }
}
