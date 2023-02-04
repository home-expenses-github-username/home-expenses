import { createAction, props } from '@ngrx/store';
import { Expense } from '../../interfaces/Expense';
import { HttpErrorResponse } from '@angular/common/http';

export const getExpenses = createAction('[Expenses] Get expenses ');

export const getExpensesResult = createAction('[Expenses] Get expenses result', props<{ expenses: Expense[] }>());

export const getExpensesError = createAction('[Expenses] Get expenses error', props<{ error: HttpErrorResponse }>());

export const createExpense = createAction('[Expenses] Create expense', props<{ expense: Expense }>());

export const createExpensesResult = createAction('[Expenses] Create expense result', props<{ expense: Expense }>());
export const createExpensesError = createAction(
  '[Expenses] Create expense result',
  props<{ error: HttpErrorResponse }>()
);

export const noOpAction = createAction('[Expenses] No Operation Action');
