import { inject, Injectable } from '@angular/core';
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
import { AuthenticatedService } from '../services/isAuthenticated/authenticated.service';

@Injectable({
  providedIn: 'root'
})
export class AtAuthGuard implements CanActivate, CanActivateChild {
  private authenticatedService = inject(AuthenticatedService);
  private router = inject(Router);
  private tokenVault = inject(TokenVaultService);
  private jwtHelper = inject(JwtHelper);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('canActivate');
    const at = this.tokenVault.getAccessToken();
    if (at && at.length && !this.jwtHelper.tokenExpired(at)) {
      this.authenticatedService.isAuthenticated = true;

      return true;
    }
    this.authenticatedService.isAuthenticated = false;
    this.tokenVault.clearAccessToken();
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
