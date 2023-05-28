import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { REFRESH_TOKEN } from './token.constants';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(REFRESH_TOKEN) {}
