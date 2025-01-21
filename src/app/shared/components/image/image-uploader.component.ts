import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ImageUploaderService } from '../../image-uploader.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-image-uploader',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css'],
})
export class ProfileImageComponent {
  @Input() userId!: string;
  @Output() imageUploaded = new EventEmitter<void>();

  private imageUploaderService = inject(ImageUploaderService);
  private snackbar = inject(SnackbarService);

  profileImage: string | null = null;
  isUploading = false;
  imageFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      this.imageFile = file;
      this.previewImage(file);
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  uploadImage(): void {
    if (this.imageFile && this.userId) {
      this.isUploading = true;

      this.imageUploaderService.upload(this.imageFile, this.userId).subscribe({
        next: () => {
          this.isUploading = false;
          this.imageUploaded.emit();
        },
        error: () => {
          this.isUploading = false;
          this.snackbar.showError('Error uploading image');
        },
      });
    }
  }

  deleteImage(): void {
    this.profileImage = null;
    this.imageFile = null;
  }
}
