import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenVaultService } from '../token-vault/token-vault.service';
import { JwtHelper } from '../jwt-helper/jwt-helper';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private tokenVault: TokenVaultService, private jwtHelper: JwtHelper) {
    console.log('CONSTRUCTOR JwtInterceptorService');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenVault.getAccessToken();

    if (token && token.length && !this.jwtHelper.tokenExpired(token)) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req);
  }
}
