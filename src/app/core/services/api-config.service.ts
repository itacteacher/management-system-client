import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly apiBaseUrl = 'https://localhost:7042/api';

  constructor() { }

  get apiUrl(): string {
    return this.apiBaseUrl;
  }

  get authUrl(): string {
    return `${this.apiBaseUrl}/Auth`;
  }

  get userUrl(): string {
    return `${this.apiBaseUrl}/Users`;
  }

  get projectUrl(): string {
    return `${this.apiBaseUrl}/Projects`;
  }
}
