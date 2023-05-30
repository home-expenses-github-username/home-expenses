import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenVaultService {
  saveAccessToken(at: string) {
    sessionStorage.setItem('at', at);
  }

  getAccessToken() {
    return sessionStorage.getItem('at');
  }

  saveRefreshToken(rt: string) {
    sessionStorage.setItem('rt', rt);
  }

  getRefreshToken() {
    return sessionStorage.getItem('rt');
  }
}
