export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  notes?: string;
}