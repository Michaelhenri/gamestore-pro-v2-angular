import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Verifica se o usuário é Administrador
  if (authService.eAdmin()) {
    return true;
  }

  // Se não for admin, redireciona para a página principal ou login
  router.navigate(['/login']);
  return false;
};