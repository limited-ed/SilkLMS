import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideStore, Store } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';

import { } from '@auth0/angular-jwt'

import { providePrimeNG } from 'primeng/config';

import { ApplicationState } from 'state/application/application.state';

import { AppTheme } from './app.theme';
import { routes } from './app.routes';
import { jwtInterceptor } from 'core/jwt/jwtInterceptor';
import { AdminState } from 'state/admin/admin.state';
import { provideReuseStrategy } from 'core/route/app_route_reuse';
import { JwtOptions, provideJwtOptions } from 'core/jwt/jwt.options';
import { of } from 'rxjs';

export const Configuration = {

  apiEndpoints: {
    login: '/login/',
    categories: '/api/category/',
    usersGroup: '/api/group/',
    users: '/api/user/',
    question: '/api/question/',
    cource: '/api/cource/'
  },
  apiHost: 'http://api-server:5000'
}

const primeOptions = {
  theme: {
    preset: AppTheme,
    options: {
      darkModeSelector: '.dark'
    }
  }
};


const jwtOptions: JwtOptions = {
  blackList:[""],
  whiteList: [Configuration.apiHost],
  getTokenFn: ()=>{
    const store = inject(Store);
    return store.selectSnapshot((state) => state.ApplicationState.apiToken)
  },
  refreshTokenFn: () => {
    return of("");
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG(primeOptions),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideStore([ApplicationState, AdminState], ...[withNgxsReduxDevtoolsPlugin(), withNgxsStoragePlugin({ keys: '*' })]),
    provideReuseStrategy(), 
    provideClientHydration(withEventReplay()),
    provideJwtOptions(jwtOptions)
  ]
};
