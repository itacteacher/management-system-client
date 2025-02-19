import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-user',
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class EditUserComponent {
  userService = inject(UserService);
  snackbar = inject(SnackbarService);

  user: User;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.user = { ...data };
  }

  onSave(): void {
    this.userService
      .updateUser(this.user.id, {
        id: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(this.user);
        },
        error: err => this.snackbar.showError(err),
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
