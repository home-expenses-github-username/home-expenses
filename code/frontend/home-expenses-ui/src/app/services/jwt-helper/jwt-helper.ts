import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtHelper {
  public tokenExpired(token: string) {
    const expiryDecoded = Buffer.from(token.split('.')[1], 'base64').toString('utf8');
    const expiry = JSON.parse(expiryDecoded).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
