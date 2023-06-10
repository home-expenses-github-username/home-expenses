import { ExpensesState } from './expenses/expenses.reducer';
import { AuthState } from './auth/auth.reducer';

export interface AppState {
  expenses: ExpensesState;
  auth: AuthState;
}
