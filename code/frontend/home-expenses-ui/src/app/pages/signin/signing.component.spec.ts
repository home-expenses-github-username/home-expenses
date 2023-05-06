import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigningComponent } from './signing.component';

describe('SigninComponent', () => {
  let component: SigningComponent;
  let fixture: ComponentFixture<SigningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigningComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
