import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getExpensesError, getExpensesResult } from '../expenses/expenses.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { login } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      // switchMap((action) => {
      //   return this.expensesService.getExpenses().pipe(
      //     map((expenses) => getExpensesResult({ expenses: expenses })),
      //     catchError((error) => of(getExpensesError({ error })))
      //   );
      // })
    )
  );
}
