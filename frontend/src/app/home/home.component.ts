// home.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseFormComponent } from '../expense-form/expense-form.component'; // Importe o componente do formulário

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
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

  displayedColumns: string[] = ['date', 'description', 'value', 'category', 'person', 'paymentMethod', 'card', 'installment', 'actions'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private expenseService: ExpenseService,
    private reportService: ReportService,
    private categoryService: CategoryService,
    private personService: PersonService,
    private cardService: CardService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {
    // Generate years from current year - 5 to current year + 5
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {
    // Verificar autenticação
    // this.authService.currentUser.subscribe(user => {
    //   this.currentUser = user;
    //   if (!user) {
    //     this.router.navigate(['/login']);
    //   }
    // });

    this.loadData();
    this.loadMonthlyReport();
    this.loadExpenses();
  }

   openAddExpenseModal(): void {
      const dialogRef = this.dialog.open(ExpenseFormComponent, {
        width: '500px', // Defina a largura do modal
        data: { isNew: true } // Você pode passar dados iniciais para o modal
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('O modal foi fechado', result);
        // 'result' conterá os dados que você pode retornar do modal (ex: a nova despesa salva)
        if (result) {
          // Lógica para adicionar a despesa à lista da tabela ou recarregar os dados
        }
      });
    }
  

  fakeCardSummary = [
    { name: 'Nubank', total: 1200.50 },
    { name: 'C6 Bank', total: 750.30 },
    { name: 'Itaú', total: 945.00 }
  ];

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
        this.snackBar.open('Erro ao carregar relatório', 'Fechar', {
          duration: 5000
        });
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
        this.snackBar.open('Erro ao carregar despesas', 'Fechar', {
          duration: 5000
        });
      }
    });
  }

  addNewRow() {
    if (this.editingExpense) return;

    const newExpense: Expense = {
      id: 0, // 0 indica que é uma nova despesa
      description: '',
      value: 0,
      date: new Date(),
      categoryId: 0,
      personId: 0,
      paymentMethod: 'CASH',
      cardId: 0,
      installment: 1,
      isRecurring: false
    };
    this.expenses = [newExpense, ...this.expenses];
    this.editingExpense = newExpense;
  }


  editRow(expense: Expense) {
    this.editingExpense = { ...expense };
  }

  saveRow(expense: Expense) {
    if (!this.validateExpense(expense)) {
      return;
    }

    if (expense.id === 0) {
      // Nova despesa
      this.expenseService.create(expense).subscribe({
        next: (newExpense) => {
          this.snackBar.open('Despesa adicionada com sucesso', 'Fechar', { duration: 3000 });
          this.expenses = this.expenses.map(e => e === expense ? newExpense : e);
          this.loadMonthlyReport();
          this.editingExpense = null;
        },
        error: (err) => {
          this.snackBar.open('Erro ao adicionar despesa', 'Fechar', { duration: 5000 });
        }
      });
    } else {
      // Edição de despesa existente
      this.expenseService.update(expense.id, expense).subscribe({
        next: () => {
          this.snackBar.open('Despesa atualizada com sucesso', 'Fechar', { duration: 3000 });
          this.loadMonthlyReport();
          this.loadExpenses();
          this.editingExpense = null;
        },
        error: (err) => {
          this.snackBar.open('Erro ao atualizar despesa', 'Fechar', { duration: 5000 });
        }
      });
    }
    this.editingExpense = null;
  }

  private validateExpense(expense: Expense): boolean {
    if (!expense.description || expense.description.trim() === '') {
      this.snackBar.open('Descrição é obrigatória', 'Fechar', { duration: 3000 });
      return false;
    }

    if (!expense.value || expense.value <= 0) {
      this.snackBar.open('Valor deve ser maior que zero', 'Fechar', { duration: 3000 });
      return false;
    }

    if (!expense.date) {
      this.snackBar.open('Data é obrigatória', 'Fechar', { duration: 3000 });
      return false;
    }

    if (!expense.categoryId || expense.categoryId <= 0) {
      this.snackBar.open('Categoria é obrigatória', 'Fechar', { duration: 3000 });
      return false;
    }

    if (!expense.personId || expense.personId <= 0) {
      this.snackBar.open('Pessoa é obrigatória', 'Fechar', { duration: 3000 });
      return false;
    }

    if (!expense.paymentMethod) {
      this.snackBar.open('Método de pagamento é obrigatório', 'Fechar', { duration: 3000 });
      return false;
    }

    if (expense.paymentMethod === 'CREDIT_CARD' && !expense.cardId) {
      this.snackBar.open('Selecione um cartão para pagamento no crédito.', 'Fechar', { duration: 3000 });
      return false;
    }

    return true;
  }

  cancelEdit() {
    if (this.editingExpense?.id === 0) {
      // Remove a nova linha se o usuário cancelar a criação
      this.expenses = this.expenses.filter(e => e !== this.editingExpense);
    }
    this.editingExpense = null;
  }

  deleteExpense(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
      this.expenseService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Despesa excluída com sucesso', 'Fechar', {
            duration: 3000
          });
          this.loadMonthlyReport();
          this.loadExpenses();
        },
        error: (err) => {
          this.snackBar.open('Erro ao excluir despesa', 'Fechar', {
            duration: 5000
          });
        }
      });
    }
  }

  isEditing(expense: Expense): boolean {
    return !!(this.editingExpense && this.editingExpense.id === expense.id);
  }

  onYearChange(): void {
    this.loadMonthlyReport();
    this.loadExpenses();
  }

  onMonthChange(): void {
    this.loadMonthlyReport();
    this.loadExpenses();
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '-';
  }

  getPersonName(personId: number): string {
    const person = this.persons.find(p => p.id === personId);
    return person ? person.name : '-';
  }

  getCardName(cardId: number): string {
    const card = this.cards.find(c => c.id === cardId);
    return card ? card.name : '-';
  }

  getPaymentMethodName(method: string): string {
    switch (method) {
      case 'CASH': return 'Dinheiro';
      case 'CREDIT_CARD': return 'Cartão de Crédito';
      case 'PIX': return 'PIX';
      case 'DEBIT': return 'Débito';
      default: return '-';
    }
  }

  getMonthName(month: number): string {
    return this.months[month - 1];
  }

  logout(): void {
    this.authService.logout();
  }
}