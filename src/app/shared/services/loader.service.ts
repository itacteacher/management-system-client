import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading = signal(false);

  isLoading() {
    return this.loading();
  }

  startLoading() {
    this.loading.set(true);
  }

  stopLoading() {
    this.loading.set(false);
  }
}
