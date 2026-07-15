import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from './category.service';
import { Category } from '../shared/models/category.model';
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
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
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
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  form: FormGroup;
  showForm = false;
  selectedCategory: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
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
        this.categories = response;
        this.sortByName();
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
        alert('Erro ao carregar categorias');
      }
    });
  }

  sortByName(): void {
    this.categories.sort((a, b) => a.name.localeCompare(b.name));
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
    if (this.form.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const data = this.form.value;

    if (this.selectedCategory) {
      this.categoryService.update(this.selectedCategory.id!, data).subscribe({
        next: () => {
          console.log('Categoria atualizada com sucesso');
          this.loadCategories();
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Erro ao atualizar categoria:', err);
          alert('Erro ao atualizar categoria');
        }
      });
    } else {
      this.categoryService.create(data).subscribe({
        next: () => {
          console.log('Categoria criada com sucesso');
          this.loadCategories();
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Erro ao criar categoria:', err);
          alert('Erro ao criar categoria');
        }
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
          console.log('Categoria excluída com sucesso');
          this.loadCategories();
        },
        error: (err) => {
          console.error('Erro ao excluir categoria:', err);
          alert('Erro ao excluir categoria');
        }
      });
    }
  }
}
