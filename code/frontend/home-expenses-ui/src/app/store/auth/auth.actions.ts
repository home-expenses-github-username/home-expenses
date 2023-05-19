import { createAction } from '@ngrx/store';

export const login = createAction('[Auth] Start Login');
export const loginSuccess = createAction('[Auth] Login was successful');
export const loginFailed = createAction('[Auth] Login Failed');
export const logout = createAction('[Auth] Start logout');
export const logoutSuccess = createAction('[Auth] Logout was successful');
export const logoutFailed = createAction('[Auth] Logout failed');
