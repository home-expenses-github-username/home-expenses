import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedService {
  private _isAuthenticated = false;

  public set isAuthenticated(isAuthenticated: boolean) {
    this._isAuthenticated = isAuthenticated;
  }

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  // private tokenExpirationTimer;
  //
  // setLogoutTimer(expirationDuration: number) {
  //   console.log('expirationDuration', expirationDuration);
  //   this.tokenExpirationTimer = setTimeout(() => {
  //     // this.store.dispatch(new AuthActions.Logout());
  //   }, expirationDuration);
  // }
  //
  // clearLogoutTimer() {
  //   if (this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer);
  //     this.tokenExpirationTimer = null;
  //   }
  // }
}
