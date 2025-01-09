import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const router = inject(Router);

  const token = storageService.getItem(authService.TOKEN_KEY);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
