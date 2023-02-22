import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Expense } from './interfaces/Expense';
import { Store } from '@ngrx/store';
import { selectExpenses, selectIsLoading } from './store/expenses/expenses.selectors';
import { createExpense, getExpenses } from './store/expenses/expenses.actions';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'home-expenses-ui';
  form: FormGroup;

  public isDataMocked = true;

  expenses$: Observable<Expense[]>;
  isLoading$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store, @Inject(LOCALE_ID) private locale: string) {
    this.expenses$ = this.store.select(selectExpenses);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  public ngOnInit(): void {
    this.store.dispatch(getExpenses({ isMockedData: this.isDataMocked }));

    this.form = this.fb.group({
      date: this.fb.control(null, [Validators.required]),
      category: this.fb.control('food', [Validators.required]),
      cost: this.fb.control(10, [Validators.required]),
      comment: this.fb.control(null, [Validators.maxLength(50)])
    });
  }

  public useMockedData(mockMode: boolean) {
    if (this.isDataMocked !== mockMode) {
      this.isDataMocked = mockMode;
      this.store.dispatch(getExpenses({ isMockedData: this.isDataMocked }));
    }
  }

  public save() {
    if (this.form.valid) {
      this.store.dispatch(createExpense({ expense: this.mapFormToRequestBody() }));
    }
  }

  private mapFormToRequestBody(): Expense {
    const rawValue = this.form.getRawValue();
    console.log('rawValue', rawValue);

    const date = new Date(rawValue.date);
    // const date = new Date();
    const timestamp: number = date.getTime();
    console.log('date', date);
    console.log('timestamp', timestamp);

    return {
      date: timestamp,
      category: rawValue.category,
      cost: rawValue.cost,
      comment: rawValue.comment
    };
  }

  public getFormattedDate(timestamp: number): string {
    return formatDate(new Date(timestamp), 'YYYY-MM-dd HH:mm:ss', this.locale);
  }
}
