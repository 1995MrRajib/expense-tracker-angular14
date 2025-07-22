import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { FormsModule } from '@angular/forms';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { CategoryChartComponent } from './category-chart/category-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AddExpenseComponent, ExpenseListComponent, EditExpenseComponent, CategoryChartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ExpensesModule { }