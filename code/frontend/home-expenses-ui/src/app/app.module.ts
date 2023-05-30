import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ExpensesEffects } from './store/expenses/expenses-effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { AllExpensesComponent } from './pages/all-expenses/all-expenses.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { SignupFinishComponent } from './pages/signup-finish/signup-finish.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AuthEffects } from './store/auth/auth.effects';
import { JwtInterceptorService } from './services/interceptor/jwt-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ExpensesComponent,
    AllExpensesComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    SignupFinishComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ExpensesEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.prod }),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
