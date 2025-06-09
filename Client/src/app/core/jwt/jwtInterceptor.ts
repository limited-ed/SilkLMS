import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngxs/store";

import { BehaviorSubject, catchError, filter, Observable, switchMap, take, tap, throwError } from "rxjs";
import { JwtHelperService } from "./jwt-helper.service";
import { JWT_OPTIONS } from "./jwt.options";



function isInWhitelist(url: string): boolean {
  let flag = false;
  this.options.whiteList?.forEach(f => {
    if (url.includes(f)) flag = true;
  });
  return flag;
}

function isInBlacklist(url: string): boolean {
  let flag = false;
  this.options.blackList?.forEach(f => {
    if (url.includes(f)) flag = true;
  });
  return flag;
}

var isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
const jwtHelper = inject(JwtHelperService);
const options = inject(JWT_OPTIONS)


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const isAuthOrRoot = req.url.includes('auth');
  var token = options.getTokenFn()

  if (isInWhitelist(req.url) && !isInBlacklist(req.url)) {
    if (jwtHelper.isTokenExpired(token, 120)) {
      return refreshToken(req, next);
    };
    req = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req
  }

  return next(req).pipe(
    catchError(err => {
      return throwError(() => err);
    })
  );

}

function refreshToken(req: HttpRequest<any>, next: HttpHandlerFn) {
  if (!isRefreshing$.getValue()) {
    if (!options.refreshTokenFn) { return throwError(() => new Error('Refresh function catn`t be null')) }
    return options.refreshTokenFn().pipe(
      tap(ref => {
        this.isRefreshing$.next(false);
      }),
      switchMap(token => {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(req);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  return this.isRefreshing$.pipe(
    filter((is) => !is),
    take(1),
    switchMap(() => {
      const token = this.tokenGetter(req)
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next(req);
    })
  )
}
