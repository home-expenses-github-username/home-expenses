import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createExpense,
  createExpensesError,
  createExpensesResult,
  getExpenses,
  getExpensesError,
  getExpensesResult
} from './expenses.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ExpensesService } from '../../services/http/expenses.service';

@Injectable()
export class ExpensesEffects {
  constructor(private actions$: Actions, private expensesService: ExpensesService) {}

  getExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getExpenses),
      switchMap((action) => {
        return this.expensesService.getExpenses(action.isMockedData).pipe(
          map((expenses) => getExpensesResult({ expenses: expenses })),
          catchError((error) => of(getExpensesError({ error })))
        );
      })
    )
  );

  createExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createExpense),
      switchMap((action) => {
        return this.expensesService.createExpense(action.expense).pipe(
          map((response) => createExpensesResult({ expense: response })),
          catchError((error) => of(createExpensesError({ error })))
        );
      })
    )
  );
}
