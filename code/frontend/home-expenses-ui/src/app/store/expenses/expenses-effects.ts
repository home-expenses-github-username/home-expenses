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
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { ExpensesService } from '../../services/http/expenses.service';
import { Store } from '@ngrx/store';
import { ExpensesV2Service } from '../../services/http/expenses-v2.service';

@Injectable()
export class ExpensesEffects {
  constructor(
    private actions$: Actions,
    private expensesService: ExpensesService,
    private expensesV2Service: ExpensesV2Service,
    private store: Store
  ) {}

  getExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getExpenses),
      switchMap((action) => {
        // return this.expensesService.getExpenses().pipe(
        return this.expensesV2Service.getExpenses().pipe(
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
        // return this.expensesService.createExpense(action.expense).pipe(
        return this.expensesV2Service.createExpense(action.expense).pipe(
          map((response) => createExpensesResult({ expense: response })),
          catchError((error) => of(createExpensesError({ error })))
        );
      })
    )
  );

  createExpensesResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createExpensesResult),
      // withLatestFrom(this.store.select(selectIsMockedData)),
      // switchMap(([, isMockedData]) => {
      switchMap(() => {
        return of(getExpenses());
      })
    )
  );
}
