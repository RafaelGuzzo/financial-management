import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardService } from './card.service';
import { Card } from '../shared/models/card.model';
import { Person } from '../shared/models/person.model';
import { PersonService } from '../persons/person.service';
import {
  ButtonDirective,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  TableDirective,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  FormSelectDirective,
  RowComponent,
  ColComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonDirective,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    TableDirective,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormSelectDirective,
    RowComponent,
    ColComponent,
    IconDirective
  ]
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];
  form: FormGroup;
  selectedCard?: Card | null = null;
  people: Person[] = [];
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private personService: PersonService
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      invoiceClosingDate: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      invoiceDueDate: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      personId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadCards();
    this.loadPeople();
  }

  loadCards(): void {
    this.cardService.getAll().subscribe({
      next: (response) => {
        this.cards = response;
      },
      error: (err) => {
        console.error('Erro ao carregar cartões:', err);
        alert('Erro ao carregar cartões');
      }
    });
  }

  loadPeople(): void {
    this.personService.getAll().subscribe({
      next: (people) => this.people = people,
      error: (err) => {
        console.error('Erro ao carregar pessoas:', err);
        alert('Erro ao carregar pessoas');
      }
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const cardData = this.form.value;

    const request$ = cardData.id
      ? this.cardService.update(cardData.id, cardData)
      : this.cardService.create(cardData);

    request$.subscribe({
      next: () => {
        console.log(`Cartão ${cardData.id ? 'atualizado' : 'adicionado'} com sucesso`);
        this.loadCards();
        this.form.reset();
        this.selectedCard = null;
        this.showForm = false;
      },
      error: (err) => {
        console.error('Erro ao salvar cartão:', err);
        alert('Erro ao salvar cartão');
      }
    });
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

  deleteCard(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cartão?')) {
      this.cardService.delete(id).subscribe({
        next: () => {
          console.log('Cartão excluído com sucesso');
          this.loadCards();
        },
        error: (err) => {
          console.error('Erro ao excluir cartão:', err);
          alert('Erro ao excluir cartão');
        }
      });
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.cancelEdit();
    }
  }

  getPersonName(personId: number): string {
    const person = this.people.find(p => p.id === personId);
    return person ? person.name : '-';
  }
}
