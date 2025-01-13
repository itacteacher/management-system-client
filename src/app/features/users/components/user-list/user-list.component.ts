import { Component, inject, OnInit, signal } from '@angular/core';
import { IPaginatedRespose, UserService } from '../../services/user.service';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../models/user.model';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { EditUserComponent } from '../user-edit/user-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserComponent implements OnInit {
  userService = inject(UserService);
  snackbar = inject(SnackbarService);
  dialog = inject(MatDialog);

  users = signal<User[]>([]);
  pageNumber = 0;
  pageSize = 5;
  totalCount = 0;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  errorMessage = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getPaginatedUsers(this.pageNumber, this.pageSize).subscribe({
      next: (response: IPaginatedRespose<User>) => {
        this.users.set(response.items);
        this.totalCount = response.totalCount;
      },
      error: err => {
        console.error(err);
      },
    });
  }

  onEditUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User data after edit', result);
        this.loadUsers();
      }
    });
  }

  onDeleteUser(userId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirm deletion',
        message: 'Are you sure you want to delete this user?',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            console.log('user deleted');
            this.loadUsers();
          },
          error: err => {
            console.error('Error occured whilst deleting a user', err);
            this.snackbar.showError(err);
          },
        });
      }
    });
  }

  onPageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.loadUsers();
  }
}
