import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngxs/store";

import { catchError, Observable, throwError } from "rxjs";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const store = inject(Store);
  
    const isAuthOrRoot = req.url.includes('auth');
    const token = store.selectSnapshot((state) => state.ApplicationState.apiToken)

    if (!isAuthOrRoot && token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next(req).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }