import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Expense } from './interfaces/Expense';
import { Store } from '@ngrx/store';
import { selectExpenses, selectIsLoading } from './store/expenses/expenses.selectors';
import { getExpenses } from './store/expenses/expenses.actions';

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

  constructor(private fb: FormBuilder, private store: Store) {
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
}
