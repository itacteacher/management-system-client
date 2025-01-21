import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { StorageService } from '../../../../core/services/storage.service';
import { JwtHelper } from '../../../../core/helpers/jwt.helper';
import { ProfileImageComponent } from '../../../../shared/components/image/image-uploader.component';
import { ImageUploaderService } from '../../../../shared/image-uploader.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, MatSidenavModule, MatListModule, MatCardModule, ProfileImageComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  private userService = inject(UserService);
  private storageService = inject(StorageService);
  private imageUploaderService = inject(ImageUploaderService);

  user: any;
  currentUserId = signal('');
  profileImage = 'images/user_placeholder.svg';

  ngOnInit(): void {
    const token = this.storageService.getItem('authToken')!;
    this.currentUserId.set(JwtHelper.getUserIdFromToken(token));

    this.userService.getUserById(this.currentUserId()).subscribe({
      next: user => (this.user = user),
      error: err => console.error('Failed to load user:', err),
    });

    this.loadProfileImage();
  }

  loadProfileImage(): void {
    this.imageUploaderService.get(this.currentUserId()).subscribe({
      next: imageUrl => {
        this.profileImage = imageUrl;
      },
      error: err => {
        console.error('Error loading profile image', err);
      },
    });
  }

  onImageUploaded(): void {
    this.loadProfileImage();
  }
}
