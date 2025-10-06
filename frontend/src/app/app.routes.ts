import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { CardsComponent } from './cards/cards.component';
import { CategoriesComponent } from './categories/categories.component';
import { PersonsComponent } from './persons/persons.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cards', children: [
        { path: '', component: CardsComponent },
        { path: 'new', component: CardsComponent },
        { path: 'edit/:id', component: CardsComponent }
      ]},
      { path: 'categories', children: [
        { path: '', component: CategoriesComponent },
        { path: 'new', component: CategoriesComponent },
        { path: 'edit/:id', component: CategoriesComponent }
      ]},
      { path: 'persons', children: [
        { path: '', component: PersonsComponent },
        { path: 'new', component: PersonsComponent },
        { path: 'edit/:id', component: PersonsComponent }
      ]},
    ]
  },

  { path: '**', redirectTo: '/home' }
];
