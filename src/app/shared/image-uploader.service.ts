import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '../core/services/api-config.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SnackbarService } from './services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ImageUploaderService {
  http = inject(HttpClient);
  apiConfig = inject(ApiConfigService);
  private snackbar = inject(SnackbarService);

  upload(imageFile: File, entityId: string): Observable<void> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const url = `${this.apiConfig.imagesUrl}/${entityId}`;

    return this.http.post<void>(url, formData).pipe(
      catchError((error: any) => {
        this.snackbar.showError('Error uploading image!');
        return throwError(() => new Error(error));
      })
    );
  }

  get(entityId: string): Observable<string> {
    const url = `${this.apiConfig.imagesUrl}/${entityId}`;

    return this.http.get(url, { responseType: 'blob' }).pipe(
      map(imageBlob => {
        return URL.createObjectURL(imageBlob);
      }),
      catchError(err => {
        this.snackbar.showError('Error loading profile image!');
        return throwError(() => new Error(err));
      })
    );
  }
}
