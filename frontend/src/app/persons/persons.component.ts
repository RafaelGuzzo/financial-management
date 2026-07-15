import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonService } from './person.service';
import { Person } from '../shared/models/person.model';
import {
  ButtonDirective,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  TableDirective,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  RowComponent,
  ColComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
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
    RowComponent,
    ColComponent,
    IconDirective
  ]
})
export class PersonsComponent implements OnInit {
  showForm = false;
  persons: Person[] = [];
  selectedPerson: Person | null = null;
  form: FormGroup;

  constructor(
    private personService: PersonService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.personService.getAll().subscribe({
      next: (response) => {
        this.persons = response;
      },
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

    const person = this.form.value;

    if (this.selectedPerson) {
      this.personService.update(this.selectedPerson.id, person).subscribe({
        next: () => {
          console.log('Pessoa atualizada com sucesso');
          this.loadPersons();
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Erro ao atualizar pessoa:', err);
          alert('Erro ao atualizar pessoa');
        }
      });
    } else {
      this.personService.create(person).subscribe({
        next: () => {
          console.log('Pessoa criada com sucesso');
          this.loadPersons();
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Erro ao criar pessoa:', err);
          alert('Erro ao criar pessoa');
        }
      });
    }
  }

  deletePerson(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.personService.delete(id).subscribe({
        next: () => {
          console.log('Pessoa excluída com sucesso');
          this.loadPersons();
        },
        error: (err) => {
          console.error('Erro ao excluir pessoa:', err);
          alert('Erro ao excluir pessoa');
        }
      });
    }
  }

  editPerson(person: Person): void {
    this.selectedPerson = person;
    this.form.patchValue(person);
    this.showForm = true;
  }

  cancelEdit(): void {
    this.selectedPerson = null;
    this.form.reset();
    this.showForm = false;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.cancelEdit();
    }
  }
}
