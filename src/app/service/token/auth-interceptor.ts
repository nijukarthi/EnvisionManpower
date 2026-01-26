import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../auth/auth';
import { Loader } from '../loader/loader';
import { catchError, finalize, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(Loader);
  const authService = inject(Auth);
  
  loader.show();

  // skip only token adding, NOT the loader hide
  const skipAuth =
    req.url.includes('/api/auth/user/send-otp') ||
    req.url.includes('/api/auth/user/verify-otp') ||
    req.url.includes('/api/auth/guestuser/send-otp') ||
    req.url.includes('/api/auth/guestuser/verify-otp');

  if (skipAuth) {
    return next(req).pipe(
      finalize(() => loader.hide())
    );
  }

  const authToken = inject(Auth).getAuthToken();

  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  });

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        loader.forceHide();
        authService.notifyUnauthorized();
      }
      return throwError(() => error);
    }),
    finalize(() => loader.hide())
  );

};
