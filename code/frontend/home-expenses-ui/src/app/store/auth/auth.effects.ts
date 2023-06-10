import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {
  refreshTokensFailed,
  refreshTokensStart,
  refreshTokensSuccess,
  refreshTokensTick,
  signin,
  signinFailed,
  signinSuccess,
  signout,
  signoutFailed,
  signoutSuccess,
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
export class AuthEffects implements OnDestroy {
  private refreshTokensTimer;

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
          catchError((errorResponse: HttpErrorResponse) => of(signinFailed(errorResponse)))
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
            this.store.dispatch(refreshTokensStart());
            this.router.navigate(['/all-expenses']);
          } else {
            this.router.navigate(['/401']);
          }
        })
      ),
    { dispatch: false }
  );

  signinFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signinFailed),
        tap(() => {
          this.router.navigate(['/401']);
        })
      ),
    { dispatch: false }
  );

  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signout),
      switchMap(() => {
        return this.authService.signout().pipe(
          map((isLogouted) => {
            if (isLogouted) {
              return signoutSuccess();
            }
            return signoutFailed({ message: `Can't signout`, status: 400 });
          }),
          catchError((errorResponse: HttpErrorResponse) => of(signoutFailed(errorResponse)))
        );
      })
    )
  );

  signoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signoutSuccess),
        tap(() => {
          if (this.refreshTokensTimer) {
            clearInterval(this.refreshTokensTimer);
            this.tokenVault.clearAllTokens();
          }

          this.router.navigate(['/auth/signin']);
        })
      ),
    { dispatch: false }
  );

  signoutFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signoutFailed),
        tap(() => {
          // TODO Create toast with warning
          // https://github.com/users/home-expenses-github-username/projects/2/views/1?pane=issue&itemId=30461527
        })
      ),
    { dispatch: false }
  );

  refreshTokensStart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(refreshTokensStart),
        tap(() => {
          if (this.refreshTokensTimer) {
            clearInterval(this.refreshTokensTimer);
          }
          this.refreshTokensTimer = setInterval(() => {
            this.store.dispatch(refreshTokensTick());
          }, 5 * 60 * 1000);
        })
      ),
    { dispatch: false }
  );

  refreshTokensTick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshTokensTick),
      switchMap(() => {
        return this.authService.refreshTokens().pipe(
          map((tokens) => refreshTokensSuccess({ tokens })),
          catchError((errorResponse: HttpErrorResponse) => of(refreshTokensFailed(errorResponse)))
        );
      })
    )
  );

  refreshTokensSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(refreshTokensSuccess),
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
        })
      ),
    { dispatch: false }
  );

  ngOnDestroy(): void {
    console.log('AuthEffects OnDestroy ');
    if (this.refreshTokensTimer) {
      clearInterval(this.refreshTokensTimer);
    }
  }
}
