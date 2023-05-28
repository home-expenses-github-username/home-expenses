import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { UserDbService } from '../database/user/service/user-db.service';
import { MailService } from '../../services/mailer/mail.service';
import { userProviders } from '../database/user/user.provider';
import { DatabaseModule } from '../database/database.module';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    JwtModule.register({
      // secret: AUTH_SECRET,
      // signOptions: { expiresIn: '5s' }
    }),
    DatabaseModule
  ],
  controllers: [AuthController],
  providers: [AccessTokenStrategy, RefreshTokenStrategy, ...userProviders, UserDbService, MailService]
})
export class AuthModule {}
