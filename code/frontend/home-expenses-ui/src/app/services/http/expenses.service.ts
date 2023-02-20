import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, map, Observable } from 'rxjs';
import { Expense } from '../../interfaces/Expense';

const expensesMock: Expense[] = require('../../mock/expenses-mock.json');

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private httpClient: HttpClient) {}

  private backendUrl = 'https://home-expenses-backend.azurewebsites.net';

  public getExpenses(isMockedData: boolean): Observable<Expense[]> {
    if (isMockedData) {
      return interval(2000).pipe(map(() => expensesMock));
    }
    // .get<{ _embedded: {expenses: Expense[]} }>('http://localhost:8080/api/expenses')

    return this.httpClient
      .get<{ _embedded: { expenses: Expense[] } }>(`${this.backendUrl}/api/expenses`)
      .pipe(map((response) => response._embedded.expenses));
  }

  public createExpense(expenseBody: Expense): Observable<Expense> {
    return this.httpClient.post<Expense>(`${this.backendUrl}/api/expenses`, expenseBody);
  }
}
