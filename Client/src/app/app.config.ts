import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideStore } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin  } from '@ngxs/devtools-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';

import { } from '@auth0/angular-jwt'

import { providePrimeNG } from 'primeng/config';

import { ApplicationState } from 'state/application/application.state';

import { AppTheme } from './app.theme';
import { routes } from './app.routes';
import { jwtInterceptor } from 'core/jwt/jwtInterceptor';
import { AdminState } from 'state/admin/admin.state';
import { provideReuseStrategy } from 'core/route/app_route_reuse';

export const Configuration = {

  apiEndpoints:   {
      login: '/login/',
      categories: '/api/category/',
      usersGroup: '/api/group/',
      users: '/api/user/',
      question: '/api/question/',
      cource: '/api/cource/'
  },
  apiHost: 'http://api-server:5000'

}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    //provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: AppTheme,
                options: {
                  darkModeSelector: '.dark'
                }
        
            }
        }),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideStore([ApplicationState,AdminState], ...[withNgxsReduxDevtoolsPlugin(), withNgxsStoragePlugin({ keys: '*' })]),
    provideReuseStrategy(), provideClientHydration(withEventReplay())
  ]
};
