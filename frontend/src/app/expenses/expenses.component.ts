import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  DropdownModule,
  SpinnerComponent,
  TableDirective
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ExpenseService } from './expense.service';
import { CategoryService } from '../categories/category.service';
import { PersonService } from '../persons/person.service';
import { CardService } from '../cards/card.service';
import { Expense } from '../shared/models/expense.model';
import { Category } from '../shared/models/category.model';
import { Person } from '../shared/models/person.model';
import { Card } from '../shared/models/card.model';

@Component({
  selector: 'app-expenses',
  standalone: true,
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ButtonDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    IconModule,
    SpinnerComponent,
    DropdownModule
  ]
})
export class ExpensesComponent implements OnInit {
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  editingExpense: Expense | null = null;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  years: number[] = [];
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  expenses: Expense[] = [];
  categories: Category[] = [];
  persons: Person[] = [];
  cards: Card[] = [];

  displayedColumns: string[] = ['date', 'description', 'value', 'category', 'person', 'paymentMethod', 'card', 'installment', 'dueDate', 'isToReceive', 'actions'];
  columnVisibility: { [key: string]: boolean } = {
    date: true,
    description: true,
    value: true,
    category: true,
    person: true,
    paymentMethod: true,
    card: true,
    installment: true,
    dueDate: true,
    isToReceive: true,
    actions: true
  };

  constructor(
    private readonly router: Router,
    private readonly expenseService: ExpenseService,
    private readonly categoryService: CategoryService,
    private readonly personService: PersonService,
    private readonly cardService: CardService
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {
    this.loadData();
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

  loadExpenses(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const startDate = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    const endDate = new Date(this.selectedYear, this.selectedMonth, 0);

    this.expenseService.getByDateRange(startDate, endDate).subscribe({
      next: (expenses) => {
        this.expenses = expenses;
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Nao foi possivel carregar as despesas.');
        this.isLoading.set(false);
      }
    });
  }

  addNewRow(): void {
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

  editRow(expense: Expense): void {
    this.editingExpense = { ...expense };
  }

  saveRow(): void {
    if (!this.editingExpense) return;

    const validation = this.validateExpense(this.editingExpense);
    if (!validation.valid) {
      alert(validation.message || 'Verifique os campos obrigatorios');
      return;
    }

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
          this.loadExpenses();
        },
        error: () => {
          alert('Erro ao salvar despesa');
        }
      });
      return;
    }

    this.expenseService.update(this.editingExpense.id, payload).subscribe({
      next: () => {
        this.editingExpense = null;
        this.loadExpenses();
      },
      error: () => {
        alert('Erro ao atualizar despesa');
      }
    });
  }

  cancelEdit(): void {
    if (this.editingExpense?.id === 0) {
      this.expenses = this.expenses.filter(e => e.id !== 0);
    }
    this.editingExpense = null;
  }

  deleteExpense(id: number): void {
    if (!confirm('Tem certeza que deseja excluir esta despesa?')) {
      return;
    }

    this.expenseService.delete(id).subscribe({
      next: () => this.loadExpenses(),
      error: () => alert('Erro ao excluir despesa')
    });
  }

  isEditing(expense: Expense): boolean {
    return !!(this.editingExpense && this.editingExpense.id === expense.id);
  }

  onMonthChange(): void {
    this.loadExpenses();
  }

  onYearChange(): void {
    this.loadExpenses();
  }

  toggleColumn(column: string): void {
    this.columnVisibility[column] = !this.columnVisibility[column];
  }

  sortCategories(field: 'name' | 'id'): void {
    this.categories.sort((a, b) => {
      if (field === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.id - b.id;
    });
  }

  openExpenseForm(expenseId?: number): void {
    if (expenseId) {
      this.router.navigate(['/expense/edit', expenseId], {
        queryParams: { year: this.selectedYear, month: this.selectedMonth }
      });
      return;
    }

    this.router.navigate(['/expense/new'], {
      queryParams: { year: this.selectedYear, month: this.selectedMonth }
    });
  }

  getPaymentMethodName(method: string): string {
    const methods: { [key: string]: string } = {
      CASH: 'Dinheiro',
      CREDIT_CARD: 'Cartao de Credito',
      PIX: 'PIX',
      DEBIT: 'Debito'
    };
    return methods[method] || method;
  }

  getPaymentMethodClass(method: string): string {
    const classes: { [key: string]: string } = {
      CASH: 'method-cash',
      CREDIT_CARD: 'method-credit',
      PIX: 'method-pix',
      DEBIT: 'method-debit'
    };

    return classes[method] || 'method-default';
  }

  getRowClass(expense: Expense): string {
    if (this.isEditing(expense)) {
      return 'editing-row';
    }

    if (expense.isToReceive) {
      return 'receivable-row';
    }

    return '';
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

  private validateExpense(expense: Expense): { valid: boolean; message?: string } {
    if (!expense.description || expense.description.trim() === '') {
      return { valid: false, message: 'Descricao e obrigatoria' };
    }

    if (!expense.value || expense.value <= 0) {
      return { valid: false, message: 'Valor deve ser maior que zero' };
    }

    if (!expense.categoryId || expense.categoryId <= 0) {
      return { valid: false, message: 'Categoria e obrigatoria' };
    }

    if (!expense.personId || expense.personId <= 0) {
      return { valid: false, message: 'Pessoa e obrigatoria' };
    }

    if (!expense.paymentMethod) {
      return { valid: false, message: 'Forma de pagamento e obrigatoria' };
    }

    if (expense.paymentMethod === 'CREDIT_CARD' && !expense.cardId) {
      return { valid: false, message: 'Selecione um cartao para pagamento no credito' };
    }

    return { valid: true };
  }
}
