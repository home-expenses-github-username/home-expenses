import { createAction, props } from '@ngrx/store';
import { Credentials } from '../../shared/interfaces/credentials';

export const signupStart = createAction('[Auth] Start signup', props<{ credentials: Credentials }>());
export const signupStartSuccess = createAction('[Auth] Start signup success');
export const signupStartFailure = createAction(
  '[Auth] Start signup failed',
  props<{ message: string; status: number }>()
);

export const signupFinish = createAction('[Auth] Finish signup', props<{ credentials: Credentials }>());
export const signupFinishSuccess = createAction('[Auth] Finish signup success');
export const signupFinishFailure = createAction(
  '[Auth] Finish signup failed',
  props<{ message: string; status: number }>()
);

export const signin = createAction('[Auth] Signin', props<{ credentials: Credentials }>());
export const signinSuccess = createAction('[Auth] Signin was successful');
export const signinFailed = createAction('[Auth] Signin Failed');

export const logout = createAction('[Auth] Start logout');
export const logoutSuccess = createAction('[Auth] Logout was successful');
export const logoutFailed = createAction('[Auth] Logout failed');
