import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../auth/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/api/auth/user/send-otp') || 
      req.url.includes('/api/auth/user/verify-otp')
    ) {
    return next(req);
  }
  const authToken = inject(Auth).getAuthToken();

  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  });

  return next(newReq);
};
