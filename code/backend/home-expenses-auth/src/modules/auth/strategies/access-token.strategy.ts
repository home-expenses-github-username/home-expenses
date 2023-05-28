import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_ACCESS_TOKEN_SECRET } from '../../../config/auth';
import { ACCESS_TOKEN } from '../guards/token.constants';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AUTH_ACCESS_TOKEN_SECRET
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
