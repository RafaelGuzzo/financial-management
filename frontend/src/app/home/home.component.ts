import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ExpenseService } from '../expenses/expense.service';
import { ReportService } from '../shared/services/report.service';
import { CategoryService } from '../categories/category.service';
import { PersonService } from '../persons/person.service';
import { CardService } from '../cards/card.service';
import { Expense } from '../shared/models/expense.model';
import { Category } from '../shared/models/category.model';
import { Person } from '../shared/models/person.model';
import { Card } from '../shared/models/card.model';
import { ReportResponse } from '../shared/models/report-response.model';
import { User } from '../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExpenseChartsComponent } from './charts/expense-charts.component';

import {
  ButtonDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  TableDirective,
  WidgetStatEComponent,
  DropdownModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    WidgetStatEComponent,
    IconModule,
    ExpenseChartsComponent,
    DropdownModule
  ]
})
export class HomeComponent implements OnInit {
  editingExpense: Expense | null = null;
  currentUser: User | null = null;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  years: number[] = [];
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  expenses: Expense[] = [];
  categories: Category[] = [];
  persons: Person[] = [];
  cards: Card[] = [];
  monthlyReport: ReportResponse | null = null;

  displayedColumns: string[] = ['date', 'description', 'value', 'category', 'person', 'paymentMethod', 'card', 'installment', 'dueDate', 'isToReceive', 'actions'];
  columnVisibility: { [key: string]: boolean } = {
    'date': true,
    'description': true,
    'value': true,
    'category': true,
    'person': true,
    'paymentMethod': true,
    'card': true,
    'installment': true,
    'dueDate': true,
    'isToReceive': true,
    'actions': true
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private expenseService: ExpenseService,
    private reportService: ReportService,
    private categoryService: CategoryService,
    private personService: PersonService,
    private cardService: CardService,
    private router: Router
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {
    this.loadData();
    this.loadMonthlyReport();
    this.loadExpenses();
  }

  loadData(): void {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });

    this.personService.getAll().subscribe(persons => {
      this.persons = persons;
    });

    this.cardService.getAll().subscribe(cards => {
      this.cards = cards;
    });
  }

  loadMonthlyReport(): void {
    this.reportService.getMonthlyReport(this.selectedYear, this.selectedMonth).subscribe({
      next: (report) => {
        this.monthlyReport = report;
      },
      error: (err) => {
        console.error('Erro ao carregar relatório:', err);
      }
    });
  }

  loadExpenses(): void {
    const startDate = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    const endDate = new Date(this.selectedYear, this.selectedMonth, 0);

    this.expenseService.getByDateRange(startDate, endDate).subscribe({
      next: (expenses) => {
        this.expenses = expenses;
      },
      error: (err) => {
        console.error('Erro ao carregar despesas:', err);
      }
    });
  }

  addNewRow() {
    if (this.editingExpense) return;

    const newExpense: Expense = {
      id: 0,
      description: '',
      value: 0,
      date: new Date(),
      categoryId: 0,
      personId: 0,
      paymentMethod: 'CASH',
      isRecurring: false,
      isToReceive: false
    };

    this.expenses = [newExpense, ...this.expenses];
    this.editingExpense = { ...newExpense };
  }

  editRow(expense: Expense) {
    this.editingExpense = { ...expense };
  }

  saveRow(expense: Expense) {
    if (!this.editingExpense) return;

    const validation = this.validateExpense(this.editingExpense);
    if (!validation.valid) {
      alert(validation.message || 'Verifique os campos obrigatórios');
      return;
    }

    // Lógica automática de vencimento para cartão de crédito
    if (this.editingExpense.paymentMethod === 'CREDIT_CARD' && this.editingExpense.cardId) {
      const selectedCard = this.cards.find(c => c.id == this.editingExpense!.cardId);
      if (selectedCard) {
        const expenseDate = new Date(this.editingExpense.date);
        let dueYear = expenseDate.getFullYear();
        let dueMonth = expenseDate.getMonth();
        
        if (expenseDate.getDate() > selectedCard.invoiceClosingDate) {
          dueMonth++;
        }
        
        this.editingExpense.dueDate = new Date(dueYear, dueMonth, selectedCard.invoiceDueDate);
      }
    }

    const payload = {
      value: this.editingExpense.value,
      description: this.editingExpense.description,
      date: this.editingExpense.date,
      installment: this.editingExpense.installment || 1,
      isRecurring: this.editingExpense.isRecurring || false,
      dueDate: this.editingExpense.dueDate,
      isToReceive: this.editingExpense.isToReceive || false,
      paymentMethod: this.editingExpense.paymentMethod,
      categoryId: this.editingExpense.categoryId,
      personId: this.editingExpense.personId,
      cardId: this.editingExpense.cardId || null
    };

    if (this.editingExpense.id === 0) {
      this.expenseService.create(payload).subscribe({
        next: () => {
          this.editingExpense = null;
          this.loadMonthlyReport();
          this.loadExpenses();
        },
        error: (err) => {
          console.error('Erro ao criar despesa:', err);
          alert('Erro ao salvar despesa');
        }
      });
    } else {
      this.expenseService.update(this.editingExpense.id, payload).subscribe({
        next: () => {
          this.editingExpense = null;
          this.loadMonthlyReport();
          this.loadExpenses();
        },
        error: (err) => {
          console.error('Erro ao atualizar despesa:', err);
          alert('Erro ao atualizar despesa');
        }
      });
    }
  }

  validateExpense(expense: Expense): { valid: boolean, message?: string } {
    if (!expense.description || expense.description.trim() === '') {
      return { valid: false, message: 'Descrição é obrigatória' };
    }

    if (!expense.value || expense.value <= 0) {
      return { valid: false, message: 'Valor deve ser maior que zero' };
    }

    if (!expense.categoryId || expense.categoryId <= 0) {
      return { valid: false, message: 'Categoria é obrigatória' };
    }

    if (!expense.personId || expense.personId <= 0) {
      return { valid: false, message: 'Pessoa é obrigatória' };
    }

    if (!expense.paymentMethod) {
      return { valid: false, message: 'Forma de pagamento é obrigatória' };
    }

    if (expense.paymentMethod === 'CREDIT_CARD' && !expense.cardId) {
      return { valid: false, message: 'Selecione um cartão para pagamento no crédito' };
    }

    return { valid: true };
  }

  cancelEdit() {
    if (this.editingExpense?.id === 0) {
      this.expenses = this.expenses.filter(e => e.id !== 0);
    }
    this.editingExpense = null;
  }

  deleteExpense(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
      this.expenseService.delete(id).subscribe({
        next: () => {
          this.loadMonthlyReport();
          this.loadExpenses();
        },
        error: (err) => {
          console.error('Erro ao excluir despesa:', err);
        }
      });
    }
  }

  isEditing(expense: Expense): boolean {
    return !!(this.editingExpense && this.editingExpense.id === expense.id);
  }

  onMonthChange() {
    this.loadMonthlyReport();
    this.loadExpenses();
  }

  onYearChange() {
    this.loadMonthlyReport();
    this.loadExpenses();
  }

  toggleColumn(column: string) {
    this.columnVisibility[column] = !this.columnVisibility[column];
  }

  sortCategories(field: 'name' | 'id') {
    this.categories.sort((a, b) => {
      if (field === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.id - b.id;
    });
  }

  getPaymentMethodName(method: string): string {
    const methods: { [key: string]: string } = {
      'CASH': 'Dinheiro',
      'CREDIT_CARD': 'Cartão de Crédito',
      'PIX': 'PIX',
      'DEBIT': 'Débito'
    };
    return methods[method] || method;
  }

  getCategoryName(id: number): string {
    return this.categories.find(c => c.id == id)?.name || 'N/A';
  }

  getPersonName(id: number): string {
    return this.persons.find(p => p.id == id)?.name || 'N/A';
  }

  getCardName(id: number): string {
    return this.cards.find(c => c.id == id)?.name || '-';
  }

  logout(): void {
    this.authService.logout();
  }
}
