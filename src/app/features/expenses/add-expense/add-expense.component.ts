import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  expenseForm!: FormGroup;
  categories: string[] = ['Food', 'Travel', 'Utilities', 'Entertainment', 'Others'];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const newExpense = {
        id: Date.now().toString(),
        ...this.expenseForm.value
      };

      this.expenseService.addExpense(newExpense);
      this.expenseForm.reset();
      this.router.navigate(['/expense-list']); // ✅ redirect
    }
  }

  goToList() {
    this.router.navigate(['/expense-list']);
  }
}
