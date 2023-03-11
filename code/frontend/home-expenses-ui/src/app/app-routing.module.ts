import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllExpensesComponent } from './pages/all-expenses/all-expenses.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'all-expenses' },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'all-expenses', component: AllExpensesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
