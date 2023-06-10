import { createAction, props } from '@ngrx/store';
import { Credentials } from '../../shared/interfaces/credentials';
import { Tokens } from '../../interfaces/tokens';

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
export const signinSuccess = createAction('[Auth] Signin was successful', props<{ tokens: Tokens }>());
export const signinFailed = createAction('[Auth] Signin Failed', props<{ message: string; status: number }>());

export const refreshTokensStart = createAction('[Auth] Refresh tokens - Start');
export const refreshTokensTick = createAction('[Auth] Refresh tokens - Tick');
export const refreshTokensSuccess = createAction('[Auth] Refresh tokens - SUCCESS', props<{ tokens: Tokens }>());
export const refreshTokensFailed = createAction(
  '[Auth] Refresh tokens - FAILED',
  props<{ message: string; status: number }>()
);

export const signout = createAction('[Auth] Sign out - Start');
export const signoutSuccess = createAction('[Auth] Sign out - SUCCESS');
export const signoutFailed = createAction('[Auth] Sign out - FAILED', props<{ message: string; status: number }>());

export const noOpAction = createAction('[Auth] No Operation Action');
