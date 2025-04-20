import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Configuration as config } from 'app.config';


export function tokenGetter() {
    const store = inject(Store);
    const token = store.selectSnapshot( (state) => state.ApplicationState.apiToken);
    return token??'';
  }

  export const jwtConfig = {
    tokenGetter: tokenGetter,
    allowedDomains: [config.apiHost.replace('http://','')],
    disallowedRoutes: [config.apiHost+config.apiEndpoints["login"]],
  }
