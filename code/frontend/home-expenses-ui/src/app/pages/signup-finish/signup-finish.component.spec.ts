import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFinishComponent } from './signup-finish.component';

describe('SignupFinishComponent', () => {
  let component: SignupFinishComponent;
  let fixture: ComponentFixture<SignupFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFinishComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
