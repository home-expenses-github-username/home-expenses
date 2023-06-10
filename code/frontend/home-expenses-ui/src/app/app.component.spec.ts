import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let componentRender: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [provideMockStore({})]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    componentRender = fixture.nativeElement;
  });

  xit('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  xit(`should have as title 'home-expenses-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // expect(app.title).toEqual('home-expenses-ui');
    const title = fixture.debugElement.query(By.css('div h1'));
    expect(title.nativeElement.innerHTML).toContain('Home Expenses - UI');
  });
});
