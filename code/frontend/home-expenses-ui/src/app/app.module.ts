import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ExpensesEffects } from './store/expenses/expenses-effects';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
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
import { ConfigService } from './services/config/config.service';
import { catchError, config, map, Observable, ObservableInput, of, switchMap, tap, timer } from 'rxjs';
import { IConfig } from './shared/interfaces/config';

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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },

    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: load1,
    //   multi: true,
    //   deps: [HttpClient, ConfigService]
    // }
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: load2WithTimer,
    //   multi: true,
    //   deps: [HttpClient, ConfigService]
    // }
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: () => load3NoArgs,
    //   multi: true
    // }
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: load4WithObservable,
    //   multi: true,
    //   deps: [HttpClient, ConfigService]
    // }
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: load4WithObservableAndError,
    //   multi: true,
    //   deps: [HttpClient, ConfigService]
    // }
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: load4WithObservableAndTimer,
    //   multi: true,
    //   deps: [HttpClient, ConfigService]
    // }
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: load4WithObservableAndTimerAndError,
    //   multi: true,
    //   deps: [HttpClient, ConfigService]
    // }
    {
      provide: APP_INITIALIZER,
      useFactory: load5Final,
      multi: true,
      deps: [ConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

function load1(http: HttpClient, configService: ConfigService) {
  console.log('APP_INITIALIZER load2()');
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject): void => {
      http
        .get('./assets/config/config.json')
        .pipe(
          map((response: IConfig) => {
            configService.initialize(response);
            // throw new Error('Ups')
            resolve(true);
          }),
          catchError((err) => {
            return Promise.reject({ err });
          })
        )
        .subscribe();
    });
  };
}
function load2WithTimer(http: HttpClient, configService: ConfigService) {
  console.log('APP_INITIALIZER load1()');
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      timer(5000)
        .pipe(
          switchMap(() => {
            return http.get('./assets/config/config.json').pipe(
              map((response: IConfig) => {
                configService.initialize(response);
                resolve(true);
              })
            );
          })
        )
        .subscribe();
    });
  };
}

function load3NoArgs() {
  console.log('APP_INITIALIZER load3()');
  return new Promise<boolean>((resolve, reject): void => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}
function load4WithObservable(http: HttpClient, configService: ConfigService): () => Observable<IConfig> {
  return () =>
    http.get('./assets/config/config.json').pipe(
      tap((response: IConfig) => {
        configService.initialize(response);
      })
    );
}
function load4WithObservableAndError(http: HttpClient, configService: ConfigService): () => Observable<IConfig> {
  return () => {
    return http.get('./assets/config/config.json').pipe(
      tap((response: IConfig) => {
        throw new Error('Some error during request');
        configService.initialize(response);
      }),
      catchError((err) => {
        console.log('==Error', err);
        const defaultConfig: IConfig = {
          baseUrl: 'default.com',
          APP_VERSION: 'DEFAULT'
        };
        configService.initialize(defaultConfig);
        return of(undefined);
      })
    );
  };
}
function load4WithObservableAndTimer(httpClient: HttpClient, configService: ConfigService): () => Observable<IConfig> {
  return () =>
    timer(2000).pipe(
      switchMap(() =>
        httpClient.get<IConfig>('./assets/config/config.json').pipe(
          tap((config: IConfig) => {
            configService.initialize(config);
          })
        )
      )
    );
}
function load4WithObservableAndTimerAndError(
  httpClient: HttpClient,
  configService: ConfigService
): () => Observable<IConfig> {
  return () =>
    timer(2000).pipe(
      switchMap(() =>
        httpClient.get<IConfig>('./assets/config/config.json').pipe(
          tap((config: IConfig) => {
            configService.initialize(config);
          }),
          map((value) => {
            throw new Error('Ups');
          })
        )
      )
    );
}

function load5Final(configService: ConfigService): () => Observable<IConfig> {
  return () => configService.loadConfig();
}
