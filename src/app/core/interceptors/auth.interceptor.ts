// core/interceptors/auth.interceptor.ts - Versão atualizada para Angular 18
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Função interceptora para Angular 18 (functional interceptor)
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Obter o usuário atual do serviço de autenticação
  const currentUser = authService.getCurrentUser();
  
  // Se o usuário estiver autenticado, adicione o token de autenticação ao cabeçalho
  if (currentUser && currentUser.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
  }
  
  // Continue com a requisição modificada e trate os erros
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Se o erro for 401 (Não Autorizado), faça logout e redirecione para a página de login
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/auth/login']);
      }
      
      // Propague o erro para que o componente possa tratá-lo
      return throwError(() => error);
    })
  );
};
