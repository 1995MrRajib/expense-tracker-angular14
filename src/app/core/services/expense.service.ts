import { Injectable } from '@angular/core';
import { Expense } from '../../core/models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];

  constructor() {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      this.expenses = JSON.parse(storedExpenses);
    }
  }

  getExpenses(): Expense[] {
    return this.expenses;
  }

  addExpense(expense: Expense) {
    this.expenses.push(expense);
    this.saveToLocal();
  }

  deleteExpense(id: string) {
    this.expenses = this.expenses.filter(exp => exp.id !== id);
    this.saveToLocal();
  }

  private saveToLocal() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  updateExpense(updated: Expense) {
    const index = this.expenses.findIndex(e => e.id === updated.id);
    if (index !== -1) {
      this.expenses[index] = updated;
      this.saveToLocal();
    }
  }
}
