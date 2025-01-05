import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.type';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from './api-config.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserUpdate } from '../models/user-update.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  apiConfig = inject(ApiConfigService);

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.apiConfig.userUrl)
    .pipe(
      map((users: User[]) => users.sort((a, b) => a.email.localeCompare(b.email))),
      catchError(this.handleError)
    )
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiConfig.userUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: string, user: UserUpdate): Observable<void> {
    return this.http.put<void>(`${this.apiConfig.userUrl}/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.userUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error occured!', error);

    return throwError(error);
  }
}