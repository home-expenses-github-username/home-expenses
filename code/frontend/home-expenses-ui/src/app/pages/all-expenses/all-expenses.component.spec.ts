import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpensesComponent } from './all-expenses.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AllExpensesComponent', () => {
  let component: AllExpensesComponent;
  let fixture: ComponentFixture<AllExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllExpensesComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({})]
    }).compileComponents();

    fixture = TestBed.createComponent(AllExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
