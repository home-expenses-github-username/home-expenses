import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Expense } from '../../interfaces/Expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private httpClient: HttpClient) {}

  public getExpenses(): Observable<Expense[]> {
    return this.httpClient
      .get<{ _embedded: Expense[] }>('http://localhost:8080/api/expenses')
      .pipe(map((response) => response._embedded));
  }

  public createExpense(expenseBody: Expense): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/expenses', expenseBody);
  }
}
