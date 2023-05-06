import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllExpensesComponent } from './pages/all-expenses/all-expenses.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { SigningComponent } from './pages/signin/signing.component';

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
      { path: 'signing', component: SigningComponent },
      { path: 'signup', component: SigningComponent },
      { path: 'logout', redirectTo: 'signing' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
