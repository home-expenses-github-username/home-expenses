import { Injectable } from '@angular/core';

enum TokenType {
  AT = 'at',
  RT = 'rt'
}

@Injectable({
  providedIn: 'root'
})
export class TokenVaultService {
  saveAccessToken(at: string) {
    localStorage.setItem(TokenType.AT, at);
  }

  getAccessToken() {
    return localStorage.getItem(TokenType.AT);
  }

  saveRefreshToken(rt: string) {
    localStorage.setItem(TokenType.RT, rt);
  }

  getRefreshToken() {
    return localStorage.getItem(TokenType.RT);
  }

  clearAccessToken() {
    localStorage.removeItem(TokenType.AT);
  }

  clearRefreshToken() {
    localStorage.removeItem(TokenType.RT);
  }

  clearAllTokens() {
    localStorage.removeItem(TokenType.AT);
    localStorage.removeItem(TokenType.RT);
  }
}
