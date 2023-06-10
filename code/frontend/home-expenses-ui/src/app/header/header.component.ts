import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';
import { signout } from '../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private store: Store) {}

  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  signout() {
    this.store.dispatch(signout());
  }
}
