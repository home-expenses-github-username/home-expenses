import { AppState } from '../state';
import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = (state: AppState): AuthState => state.auth;

export const selectIsAuthenticated = createSelector(selectAuthState, (state: AuthState) => state.authenticated);
