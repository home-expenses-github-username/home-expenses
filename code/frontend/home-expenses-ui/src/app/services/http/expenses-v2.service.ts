import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../../interfaces/Expense';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesV2Service {
  constructor(private httpClient: HttpClient) {}

  private url = environment.authApiUrl;

  public getExpenses(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(`${this.url}/api/expense/findAll`);
  }

  public createExpense(expenseBody: Expense): Observable<Expense> {
    return this.httpClient.post<Expense>(`${this.url}/api/expense/create`, expenseBody);
  }
}
