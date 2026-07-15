import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptorFn: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
        snackBar.open('Sessão expirada. Faça login novamente.', 'Fechar', { duration: 5000 });
      } else if (error.status === 403) {
        snackBar.open('Acesso negado. Você não tem permissão para esta ação.', 'Fechar', { duration: 5000 });
      } else if (error.error?.message) {
        snackBar.open(error.error.message, 'Fechar', { duration: 5000 });
      } else {
        snackBar.open('Ocorreu um erro inesperado.', 'Fechar', { duration: 5000 });
      }

      return throwError(error);
    })
  );
};
