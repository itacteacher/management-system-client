import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { inject } from '@angular/core';
import { ErrorHandlerService } from '../services/error-handler.service';
import { Router } from '@angular/router';

export const errorHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const snackbarService = inject(SnackbarService);
  const errorHandlerService = inject(ErrorHandlerService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      const handledError = errorHandlerService.handleError(error);

      if (error.status === 500 || error.status === 0) {
        router.navigate(['/error']);
      }

      snackbarService.showError(handledError);

      return throwError(() => handledError);
    })
  );
};
