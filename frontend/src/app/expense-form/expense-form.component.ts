import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseService } from '../expenses/expense.service';
import { CategoryService } from '../categories/category.service';
import { PersonService } from '../persons/person.service';
import { CardService } from '../cards/card.service';
import { Expense } from '../shared/models/expense.model';
import { Category } from '../shared/models/category.model';
import { Person } from '../shared/models/person.model';
import { Card } from '../shared/models/card.model';

// ✅ Imports CoreUI
import {
  CardComponent,
  CardBodyComponent,
  ButtonDirective,
  FormControlDirective,
  FormSelectDirective,
} from '@coreui/angular';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    // ✅ CoreUI
    CardComponent,
    CardBodyComponent,
    ButtonDirective,
    FormControlDirective,
    FormSelectDirective,
  ],
})
export class ExpenseFormComponent implements OnInit {
  expense: Expense = {} as Expense;
  isEdit = false;
  isLoading = true;

  selectedYear!: number;
  selectedMonth!: number;

  categories: Category[] = [];
  persons: Person[] = [];
  cards: Card[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    private personService: PersonService,
    private cardService: CardService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.selectedYear =
      Number(this.route.snapshot.queryParamMap.get('year')) ||
      new Date().getFullYear();
    this.selectedMonth =
      Number(this.route.snapshot.queryParamMap.get('month')) ||
      new Date().getMonth() + 1;

    const id = this.route.snapshot.paramMap.get('id');
    this.loadData();

    if (id) {
      this.isEdit = true;
      // this.expenseService.getById(Number(id)).subscribe({...});
    } else {
      this.expense = {
        id: 0,
        description: '',
        value: 0,
        date: new Date(),
        categoryId: 0,
        personId: 0,
        paymentMethod: 'CASH',
        cardId: 0,
        installment: 1,
        isRecurring: false,
      };
      this.isLoading = false;
    }
  }

  loadData(): void {
    this.categoryService.getAll().subscribe((res) => (this.categories = res));
    this.personService.getAll().subscribe((res) => (this.persons = res));
    this.cardService.getAll().subscribe((res) => (this.cards = res));
  }

  save(): void {
    const action = this.isEdit
      ? this.expenseService.update(this.expense.id, this.expense)
      : this.expenseService.create(this.expense);

    action.subscribe({
      next: () => {
        this.snackBar.open('Despesa salva com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.backToHome();
      },
      error: () =>
        this.snackBar.open('Erro ao salvar despesa', 'Fechar', {
          duration: 5000,
        }),
    });
  }

  cancel(): void {
    this.backToHome();
  }

  backToHome(): void {
    this.router.navigate(['/home'], {
      queryParams: { year: this.selectedYear, month: this.selectedMonth },
    });
  }
}
