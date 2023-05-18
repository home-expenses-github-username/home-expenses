import { expensesReducer } from './expenses/expenses.reducer';
import { authReducer } from './auth/auth.reducer';

export const reducers = {
  expenses: expensesReducer,
  auth: authReducer
};
