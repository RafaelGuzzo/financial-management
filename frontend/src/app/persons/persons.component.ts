import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PersonService } from './person.service';
import { Person } from '../shared/models/person.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class PersonsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  showForm = false;
  persons: Person[] = [];
  selectedPerson: Person | null = null;
  form: FormGroup;
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(
    private personService: PersonService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
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
        this.totalItems = response.length;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar pessoas', 'Fechar', { duration: 5000 });
      }
    });
  }

  onSave(): void {
    if (this.form.invalid) return;

    const person = this.form.value;

    if (this.selectedPerson) {
      this.personService.update(this.selectedPerson.id, person).subscribe(() => {
        this.loadPersons();
        this.cancelEdit();
      });
    } else {
      this.personService.create(person).subscribe(() => {
        this.loadPersons();
        this.cancelEdit();
      });
    }
  }


  deletePerson(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.personService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Pessoa excluída com sucesso', 'Fechar', { duration: 3000 });
          this.loadPersons();
        },
        error: () => {
          this.snackBar.open('Erro ao excluir pessoa', 'Fechar', { duration: 5000 });
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

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPersons();
  }
}