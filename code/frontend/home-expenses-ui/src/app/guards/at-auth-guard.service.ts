import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenVaultService } from '../services/token-vault/token-vault.service';
import { JwtHelper } from '../services/jwt-helper/jwt-helper';

@Injectable({
  providedIn: 'root'
})
export class AtAuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private readonly tokenVault: TokenVaultService, private jwtHelper: JwtHelper) {
    console.log('CONSTRUCTOR AtAuthGuard');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canActivate');
    const at = this.tokenVault.getAccessToken();
    if (at && at.length && !this.jwtHelper.tokenExpired(at)) {
      return true;
    }
    return this.router.parseUrl(`/auth/signin`);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canActivateChild');
    return true;
  }
}
