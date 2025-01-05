import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../models/user.type';
import { SnackbarService } from '../../services/snackbar.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  userService = inject(UserService);
  snackbar = inject(SnackbarService);
  dialog = inject(MatDialog);
  
  users = signal<Array<User>>([]);
  pageIndex = signal<number>(0);
  pageSize = signal<number>(5);

  paginatedUsers = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.users().slice(startIndex, endIndex);
  });
  
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  errorMessage = '';

  constructor() {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) =>
      {
        this.users.set(data);
      },
      error: (err) => {
        this.errorMessage = err;
        console.error('Error occured!', err);
        this.snackbar.openSnackBar(err, 'close');
      }
    })
  }

  onEditUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        console.log('User data after edit', result);
        this.loadUsers();
      }
    })
  }

  onDeleteUser(userId: string): void {
    if(confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log('User deleted');
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error occured whilst deleting this user', err);
          this.snackbar.openSnackBar(err, 'close');
        }
      })
    }
  }

  onPageChanged(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
