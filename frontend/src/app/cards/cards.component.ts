// src/app/cards/cards.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CardService } from './card.service';
import { Card } from '../shared/models/card.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Person } from '../shared/models/person.model';
import { PersonService } from '../persons/person.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class CardsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'personName', 'invoiceClosingDate', 'invoiceDueDate', 'actions'];
  cards: Card[] = [];
  loading = false;
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  form: FormGroup;
  selectedCard?: Card | null = null;
  people: Person[] = [];
  showForm = false;


  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private snackBar: MatSnackBar,
    private personService: PersonService,
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      invoiceClosingDate: [null, Validators.required],
      invoiceDueDate: [null, Validators.required],
      personId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const cardData = this.form.value;

      const request$ = cardData.id
        ? this.cardService.update(cardData.id, cardData)
        : this.cardService.create(cardData);

      request$.subscribe({
        next: () => {
          this.snackBar.open(`Cartão ${cardData.id ? 'atualizado' : 'adicionado'} com sucesso!`, 'Fechar', { duration: 3000 });
          this.loadCards();
          this.form.reset();
          this.selectedCard = null;
          this.showForm = false;
        },
        error: () => {
          this.snackBar.open('Erro ao salvar cartão.', 'Fechar', { duration: 5000 });
        }
      });
    }
  }

  editCard(card: Card): void {
    this.selectedCard = card;
    this.showForm = true;
    this.form.patchValue(card);
  }

  cancelEdit(): void {
    this.form.reset();
    this.selectedCard = null;
    this.showForm = false;
  }

  ngOnInit(): void {
    this.loadCards();
    this.loadPeople();
  }

  loadCards(): void {
    this.loading = true;
    this.cardService.getAll().subscribe({
      next: (response) => {
        this.cards = response;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar cartões', 'Fechar', { duration: 5000 });
        this.loading = false;
      }
    });
  }

  loadPeople(): void {
    this.personService.getAll().subscribe({
      next: (people) => this.people = people,
      error: () => this.snackBar.open('Erro ao carregar pessoas.', 'Fechar', { duration: 5000 })
    });
  }

  deleteCard(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cartão?')) {
      this.cardService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Cartão excluído com sucesso', 'Fechar', { duration: 3000 });
          this.loadCards();
        },
        error: () => {
          this.snackBar.open('Erro ao excluir cartão', 'Fechar', { duration: 5000 });
        }
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCards();
  }
}