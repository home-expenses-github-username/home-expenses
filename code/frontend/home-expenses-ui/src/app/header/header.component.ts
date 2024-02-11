import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { signout } from '../store/auth/auth.actions';
import { AuthenticatedService } from '../services/isAuthenticated/authenticated.service';
import { ConfigService } from '../services/config/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public authenticatedService = inject(AuthenticatedService);

  constructor(private store: Store, public configService: ConfigService) {}

  signout() {
    this.store.dispatch(signout());
  }
}
