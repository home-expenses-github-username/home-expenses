import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timer } from 'rxjs';
import { Expense } from '../../interfaces/Expense';
import { environment } from '../../../environments/environment';

const expensesMock: Expense[] = require('../../mock/expenses-mock.json');

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private httpClient: HttpClient) {}

  private url = environment.backendUrl;

  public getExpenses(isMockedData: boolean): Observable<Expense[]> {
    if (isMockedData) {
      return timer(2000).pipe(map(() => expensesMock));
    }
    // .get<{ _embedded: {expenses: Expense[]} }>('http://localhost:8080/api/expenses')

    return this.httpClient
      .get<{ _embedded: { expenses: Expense[] } }>(`${this.url}/api/expenses`)
      .pipe(map((response) => response._embedded.expenses));
  }

  public createExpense(expenseBody: Expense): Observable<Expense> {
    return this.httpClient.post<Expense>(`${this.url}/api/expenses`, expenseBody);
  }
}
