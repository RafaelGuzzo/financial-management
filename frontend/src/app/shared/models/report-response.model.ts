export interface ReportResponse {
  year: number;
  month: number;
  totalExpenses: number;
  expensesByPerson: { [key: string]: number };
  expensesByCategory: { [key: string]: number };
  expensesByCard: { [key: string]: number };
}