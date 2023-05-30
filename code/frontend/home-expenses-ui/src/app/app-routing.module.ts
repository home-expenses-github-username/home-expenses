import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllExpensesComponent } from './pages/all-expenses/all-expenses.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { AtAuthGuard } from './guards/at-auth-guard.service';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SignupFinishComponent } from './pages/signup-finish/signup-finish.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AtAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all-expenses'
      },
      {
        path: 'expenses',
        // canActivate: [AtAuthGuard],
        component: ExpensesComponent
      },
      {
        path: 'all-expenses',
        // canActivate: [AtAuthGuard],
        component: AllExpensesComponent
      },
      {
        path: 'auth',
        children: [
          { path: 'signup-start', component: SignupComponent },
          { path: 'signup-finish', component: SignupFinishComponent },
          { path: 'signin', component: SigninComponent },
          { path: 'logout', redirectTo: 'signing' }
        ]
      },
      {
        path: ':errorCode',
        component: ErrorPageComponent
      },
      {
        path: '**',
        redirectTo: '/404'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
