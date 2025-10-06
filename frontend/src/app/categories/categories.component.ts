// src/app/categories/categories.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryService } from './category.service';
import { Category } from '../shared/models/category.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'color', 'actions'];
  categories: Category[] = [];

  form: FormGroup;
  showForm = false;
  selectedCategory: Category | null = null;
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      color: ['#000000', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response
      },
      error: () => {
        this.snackBar.open('Erro ao carregar categorias', 'Fechar', { duration: 5000 });
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.cancelEdit();
    }
  }

  editCategory(category: Category): void {
    this.selectedCategory = category;
    this.form.patchValue(category);
    this.showForm = true;
  }

  onSave(): void {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.selectedCategory) {
      this.categoryService.update(this.selectedCategory.id!, data).subscribe(() => {
        this.loadCategories();
        this.cancelEdit();
      });
    } else {
      this.categoryService.create(data).subscribe(() => {
        this.loadCategories();
        this.cancelEdit();
      });
    }
  }

  cancelEdit(): void {
    this.selectedCategory = null;
    this.form.reset({ color: '#000000' });
    this.showForm = false;
  }

  deleteCategory(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoryService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Categoria excluída com sucesso', 'Fechar', { duration: 3000 });
          this.loadCategories();
        },
        error: () => {
          this.snackBar.open('Erro ao excluir categoria', 'Fechar', { duration: 5000 });
        }
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCategories();
  }
}