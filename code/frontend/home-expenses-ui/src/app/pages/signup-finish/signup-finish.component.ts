import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signupFinish } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-signup-finish',
  templateUrl: './signup-finish.component.html',
  styleUrls: ['./signup-finish.component.scss']
})
export class SignupFinishComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      verificationCode: this.fb.control('', [Validators.required])
    });
  }

  activate() {
    if (this.form.valid) {
      this.store.dispatch(
        signupFinish({
          credentials: {
            email: this.form.controls['email'].value,
            password: this.form.controls['password'].value,
            verificationCode: this.form.controls['verificationCode'].value
          }
        })
      );
    } else {
      // console.log('Form invalid', this.form);
    }
  }
}
