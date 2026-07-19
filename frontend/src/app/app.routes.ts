import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { CardsComponent } from './cards/cards.component';
import { CategoriesComponent } from './categories/categories.component';
import { PersonsComponent } from './persons/persons.component';
import { DefaultLayoutComponent } from './layout';
import { ExpenseFormComponent } from './expense-form/expense-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'expenses', loadComponent: () => import('./expenses/expenses.component').then(m => m.ExpensesComponent) },
      { path: 'reports', loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent) },
      {
        path: 'expense',
        children: [
          { path: 'new', component: ExpenseFormComponent },
          { path: 'edit/:id', component: ExpenseFormComponent }
        ]
      },
      {
        path: 'cards', children: [
          { path: '', component: CardsComponent },
          { path: 'new', component: CardsComponent },
          { path: 'edit/:id', component: CardsComponent }
        ]
      },
      {
        path: 'categories', children: [
          { path: '', component: CategoriesComponent },
          { path: 'new', component: CategoriesComponent },
          { path: 'edit/:id', component: CategoriesComponent }
        ]
      },
      {
        path: 'persons', children: [
          { path: '', component: PersonsComponent },
          { path: 'new', component: PersonsComponent },
          { path: 'edit/:id', component: PersonsComponent }
        ]
      },
    ]
  },

  { path: '**', redirectTo: '/home' }
];
