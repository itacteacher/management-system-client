import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '../../../core/services/api-config.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private config = inject(ApiConfigService);
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'authToken';

  constructor() { }

  async register(userData: IRegisterRequest) {
    try {
      const response = await firstValueFrom(this.http.post(`${this.config.authUrl}/register`, userData));
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login(credentials: ILoginRequest) {
    try {
      const response = await firstValueFrom(this.http.post<{token: string, refreshToken: string}>(`${this.config.authUrl}/login`, credentials));
      this.setLocalStorageItem(this.TOKEN_KEY, response.token);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  logout(): void {
    this.removeLocalStorageItem(this.TOKEN_KEY);
    this.router.navigate(['']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setLocalStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private removeLocalStorageItem(key: string): void {
    localStorage.removeItem(key);
  }
}
