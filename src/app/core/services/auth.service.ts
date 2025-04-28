// core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';

interface LoginResponse {
  token: string;
  user: any; // Assuming user object has role or isMaster property
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenExpirationTimer: any;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.loadStoredUser();
  }

  login(email: string, password: string): Observable<any> {
    return this.apiService.post<LoginResponse>('auth/login', { email, password })
      .pipe(
        tap(response => this.handleAuthentication(response)),
        catchError(error => {
          console.error('Erro no login:', error);
          // Provide a more specific error message if possible from backend
          return throwError(() => new Error('Falha na autenticação. Verifique suas credenciais.'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
    
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  // Added method to check if the current user is a master user
  isMasterUser(): boolean {
    const user = this.getCurrentUser();
    // Adjust the condition based on how master user is identified (e.g., role, specific property)
    // Example: return user && user.role === 'Master';
    // Example: return user && user.isMaster === true;
    return user && (user.role === 'Master' || user.isMaster === true); // Assuming one of these properties exists
  }

  private handleAuthentication(response: LoginResponse): void {
    const expirationDate = new Date(new Date().getTime() + response.expiresIn * 1000);
    
    const userData = {
      ...response.user,
      token: response.token,
      tokenExpirationDate: expirationDate
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    this.currentUserSubject.next(userData);
    this.autoLogout(response.expiresIn * 1000);
  }

  private loadStoredUser(): void {
    const userData = localStorage.getItem('userData');
    
    if (!userData) {
      return;
    }
    
    const parsedData = JSON.parse(userData);
    const expirationDate = new Date(parsedData.tokenExpirationDate);
    
    if (expirationDate <= new Date()) {
      this.logout();
      return;
    }
    
    this.currentUserSubject.next(parsedData);
    const expirationDuration = expirationDate.getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }
}

