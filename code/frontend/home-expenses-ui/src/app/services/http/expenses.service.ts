import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, map, Observable} from 'rxjs';
import { Expense } from '../../interfaces/Expense';

const expensesMock: Expense[] = require('../../mock/expenses-mock.json');

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private httpClient: HttpClient) {}

  public getExpenses(): Observable<Expense[]> {
    // return this.httpClient
    //   .get<{ _embedded: Expense[] }>('http://localhost:8080/api/expenses')
    //   .pipe(map((response) => response._embedded));

    // return of(expensesMock);
    return interval(2000).pipe(map(() => expensesMock));
  }

  public createExpense(expenseBody: Expense): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/expenses', expenseBody);
  }
}
