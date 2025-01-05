import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '../services/api-config.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
