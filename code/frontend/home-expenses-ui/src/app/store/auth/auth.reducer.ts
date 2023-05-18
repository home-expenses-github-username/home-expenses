import { Action, createReducer, on } from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';
import { login, loginFailed, loginSuccess, logout, logoutFailed, logoutSuccess } from './auth.actions';

export interface AuthState {
  authenticated: boolean;
  isLoading: boolean;
  error: HttpErrorResponse;
}

const authInitialState: AuthState = {
  authenticated: false,
  isLoading: false,
  error: null
};

const _authReducer = createReducer(
  authInitialState,

  on(login, (state, action) => ({
    ...state,
    isLoading: true
  })),
  on(loginSuccess, (state, action) => ({
    ...state,
    isLoading: false
  })),
  on(loginFailed, (state, action) => ({
    ...state,
    isLoading: false
  })),

  on(logout, (state, action) => ({
    ...state,
    isLoading: true
  })),
  on(logoutSuccess, (state, action) => ({
    ...state,
    isLoading: false
  })),
  on(logoutFailed, (state, action) => ({
    ...state,
    isLoading: false
  }))
);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
