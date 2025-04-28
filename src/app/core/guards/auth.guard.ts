// core/guards/auth.guard.ts - Versão atualizada para Angular 18
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redireciona para a página de login se não estiver autenticado
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
