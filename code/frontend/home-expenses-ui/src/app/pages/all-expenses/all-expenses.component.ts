import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../../interfaces/Expense';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectExpenses, selectIsLoading } from '../../store/expenses/expenses.selectors';
import { createExpense, getExpenses } from '../../store/expenses/expenses.actions';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.scss']
})
export class AllExpensesComponent implements OnInit {
  public form: FormGroup;

  public expenses$: Observable<Expense[]>;
  public isLoading$: Observable<boolean>;

  constructor(private fb: FormBuilder, private store: Store, @Inject(LOCALE_ID) private locale: string) {
    this.expenses$ = this.store.select(selectExpenses);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  public ngOnInit(): void {
    this.store.dispatch(getExpenses());

    this.form = this.fb.group({
      date: this.fb.control(new Date().toISOString().substring(0, 10), [Validators.required]),
      category: this.fb.control('food', [Validators.required]),
      cost: this.fb.control(10, [Validators.required]),
      comment: this.fb.control(null, [Validators.maxLength(50)])
    });
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
