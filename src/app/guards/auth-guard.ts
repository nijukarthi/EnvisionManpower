import { Auth } from '@/service/auth/auth';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();

  if (isAuth) {  
    return true;
  } else{
    return router.createUrlTree(['/login']);
  }
};
