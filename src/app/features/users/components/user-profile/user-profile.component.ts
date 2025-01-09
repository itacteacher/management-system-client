import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { StorageService } from '../../../../core/services/storage.service';
import { JwtHelper } from '../../../../core/helpers/jwt.helper';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, MatSidenavModule, MatListModule, MatCardModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  private userService = inject(UserService);
  private storageService = inject(StorageService);

  user: any;

  ngOnInit(): void {
    const token = this.storageService.getItem('authToken')!;
    const userId = JwtHelper.getUserIdFromToken(token);

    this.userService.getUserById(userId).subscribe({
      next: user => (this.user = user),
      error: err => console.error('Failed to load user:', err),
    });
  }
}
