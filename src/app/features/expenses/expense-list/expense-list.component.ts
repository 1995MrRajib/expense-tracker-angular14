import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { Expense } from 'src/app/core/models/expense.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {
  searchTerm: string = '';
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  totalAmount: number = 0;
  totalCount: number = 0;
  averageAmount: number = 0;
  categoryTotals: { [category: string]: number } = {};


  constructor(
    private expenseService: ExpenseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.expenses = this.expenseService.getExpenses();
    this.filteredExpenses = this.expenses;
    this.calculateSummary();
  }

  filterExpenses() {
    const term = this.searchTerm.toLowerCase();

    this.filteredExpenses = this.expenses.filter(exp =>
      exp.category.toLowerCase().includes(term) ||
      (exp.notes && exp.notes.toLowerCase().includes(term))
    );
  }

  deleteExpense(id: string): void {
    this.expenseService.deleteExpense(id);
    this.expenses = this.expenseService.getExpenses();
    this.filterExpenses(); // refresh filter too
    this.calculateSummary();
  }

  goToAdd() {
    this.router.navigate(['/add-expense']);
  }

  editExpense(id: string) {
    this.router.navigate(['/edit-expense', id]);
    this.calculateSummary();
  }

  calculateSummary() {
    const total = this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    this.totalAmount = total;
    this.totalCount = this.expenses.length;
    this.averageAmount = this.totalCount ? Math.round(total / this.totalCount) : 0;

    // Category-wise total
    this.categoryTotals = {};
    this.expenses.forEach(exp => {
      if (!this.categoryTotals[exp.category]) {
        this.categoryTotals[exp.category] = 0;
      }
      this.categoryTotals[exp.category] += exp.amount;
    });
  }

  getCategoryKeys(): string[] {
    return Object.keys(this.categoryTotals);
  }
}
