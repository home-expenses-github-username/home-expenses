import { createSelector } from '@ngrx/store';
import { ExpensesState } from './expenses.reducer';
import { AppState } from '../state';

export const selectExpensesState = (state: AppState): ExpensesState => state.expenses;

export const selectExpenses = createSelector(selectExpensesState, (state: ExpensesState) =>
  [...state.expenses].sort((a, b) => Number(b.date) - Number(a.date))
);

export const selectIsLoading = createSelector(selectExpensesState, (state: ExpensesState) => state.isLoading);

export const selectError = createSelector(selectExpensesState, (state: ExpensesState) => state.error);
