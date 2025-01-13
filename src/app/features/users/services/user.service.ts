import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../../../core/services/api-config.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserUpdate } from '../models/user-update.model';

export interface IPaginatedRespose<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  apiConfig = inject(ApiConfigService);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiConfig.userUrl).pipe(
      map((users: User[]) => users.sort((a, b) => a.email.localeCompare(b.email))),
      catchError(this.handleError)
    );
  }

  getPaginatedUsers(pageNumber: number, pageSize: number): Observable<IPaginatedRespose<User>> {
    return this.http.get<IPaginatedRespose<User>>(`${this.apiConfig.userUrl}/Paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiConfig.userUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateUser(id: string, user: UserUpdate): Observable<void> {
    return this.http.put<void>(`${this.apiConfig.userUrl}/${id}`, user).pipe(catchError(this.handleError));
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.userUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Error occured!', error);

    return throwError(error);
  }
}
