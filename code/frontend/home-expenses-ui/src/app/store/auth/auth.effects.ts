import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {
  signin,
  signinFailed,
  signinSuccess,
  signupFinish,
  signupFinishFailure,
  signupFinishSuccess,
  signupStart,
  signupStartFailure,
  signupStartSuccess
} from './auth.actions';
import { AuthService } from '../../services/http/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TokenVaultService } from '../../services/token-vault/token-vault.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private tokenVault: TokenVaultService
  ) {}

  signupStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupStart),
      switchMap((action) => {
        return this.authService.signupStart(action.credentials).pipe(
          map(() => signupStartSuccess()),
          catchError((errorResponse: HttpErrorResponse) => of(signupStartFailure(errorResponse)))
        );
      })
    )
  );

  signupStartSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupStartSuccess),
        tap(() => {
          this.router.navigate(['/auth/signup-finish']);
        })
      ),
    { dispatch: false }
  );

  signupStartFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupStartFailure),
        tap(() => {
          this.router.navigate(['/400']);
        })
      ),
    { dispatch: false }
  );

  signupFinish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signupFinish),
      switchMap((action) => {
        return this.authService.signupFinish(action.credentials).pipe(
          map(() => signupFinishSuccess()),
          catchError((errorResponse: HttpErrorResponse) => of(signupFinishFailure(errorResponse)))
        );
      })
    )
  );

  signupFinishSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupFinishSuccess),
        tap(() => {
          this.router.navigate(['/all-expenses']);
        })
      ),
    { dispatch: false }
  );

  signupFinishFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signupFinishFailure),
        tap(() => {
          this.router.navigate(['/400']);
        })
      ),
    { dispatch: false }
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signin),
      switchMap((action) =>
        this.authService.signin(action.credentials).pipe(
          map((tokens) => signinSuccess({ tokens })),
          catchError((errorResponse: HttpErrorResponse) => of(signupStartFailure(errorResponse)))
        )
      )
    )
  );

  signinSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signinSuccess),
        tap((action) => {
          if (
            action.tokens.access_token &&
            action.tokens.refresh_token &&
            action.tokens.access_token.length &&
            action.tokens.refresh_token.length
          ) {
            this.tokenVault.saveAccessToken(action.tokens.access_token);
            this.tokenVault.saveRefreshToken(action.tokens.refresh_token);
          }
          this.router.navigate(['/all-expenses']);
        })
      ),
    { dispatch: false }
  );

  signinFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signinFailed),
        tap(() => {
          this.router.navigate(['/400']);
        })
      ),
    { dispatch: false }
  );
}
