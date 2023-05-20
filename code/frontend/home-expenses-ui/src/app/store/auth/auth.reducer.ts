import { Action, createReducer, on } from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';
import { signin, signinFailed, signinSuccess, logout, logoutFailed, logoutSuccess } from './auth.actions';

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

  on(signin, (state, action) => ({
    ...state,
    isLoading: true
  })),
  on(signinSuccess, (state, action) => ({
    ...state,
    isLoading: false
  })),
  on(signinFailed, (state, action) => ({
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
