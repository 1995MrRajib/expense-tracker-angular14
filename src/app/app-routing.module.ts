import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './features/expenses/add-expense/add-expense.component';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list.component';
import { EditExpenseComponent } from './features/expenses/edit-expense/edit-expense.component';

const routes: Routes = [
  { path: 'add-expense', component: AddExpenseComponent },
  { path: 'edit-expense/:id', component: EditExpenseComponent },
  { path: 'expense-list', component: ExpenseListComponent },
  { path: '', redirectTo: 'add-expense', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }