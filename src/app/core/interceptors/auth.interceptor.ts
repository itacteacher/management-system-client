import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const token = storageService.getItem(authService.TOKEN_KEY);

  const cloneRequestWithToken = (request: HttpRequest<any>, token: string) =>
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

  if (token) {
    const clonedRequest = cloneRequestWithToken(req, token);

    return next(clonedRequest).pipe(
      catchError(error => {
        if (error.status === 401) {
          const refreshToken = storageService.getItem(authService.REFRESH_TOKEN_KEY);

          if (refreshToken) {
            return from(authService.refreshToken(refreshToken)).pipe(
              switchMap(response => {
                const newRequest = cloneRequestWithToken(req, response.token);
                return next(newRequest);
              })
            );
          }
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
