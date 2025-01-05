import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, duration: number = 4000): void {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: 'snack-success',
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 5000,
      panelClass: 'snack-error',
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }

  showWarning(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 4000,
      panelClass: 'snack-warning',
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }
}
