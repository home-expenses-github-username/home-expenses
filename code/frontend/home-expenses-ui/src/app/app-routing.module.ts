import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllExpensesComponent } from './pages/all-expenses/all-expenses.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all-expenses'
      },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'all-expenses', component: AllExpensesComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'logout', redirectTo: 'signing' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
