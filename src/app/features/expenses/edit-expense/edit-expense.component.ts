import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { Expense } from 'src/app/core/models/expense.model';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent implements OnInit {
  expenseForm!: FormGroup;
  expenseId!: string;
  expenseToEdit!: Expense | undefined;
  categories: string[] = ['Food', 'Travel', 'Utilities', 'Entertainment', 'Others'];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private expenseService: ExpenseService
  ) {}

  ngOnInit(): void {
    this.expenseId = this.route.snapshot.paramMap.get('id') || '';
    const expenses = this.expenseService.getExpenses();
    this.expenseToEdit = expenses.find(e => e.id === this.expenseId);

    if (!this.expenseToEdit) {
      alert('Expense not found');
      this.router.navigate(['/expense-list']);
      return;
    }

    this.expenseForm = this.fb.group({
      category: [this.expenseToEdit.category, Validators.required],
      amount: [this.expenseToEdit.amount, [Validators.required, Validators.min(1)]],
      date: [this.expenseToEdit.date, Validators.required],
      notes: [this.expenseToEdit.notes]
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const updatedExpense: Expense = {
        id: this.expenseId,
        ...this.expenseForm.value
      };

      this.expenseService.updateExpense(updatedExpense);
      this.router.navigate(['/expense-list']);
    }
  }
}
