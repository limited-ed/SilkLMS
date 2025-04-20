import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';


import { map, take } from 'rxjs/operators';
import { ApplicationStateSelectors } from 'state/application/application.selectors';
import { GlobalState } from 'state/models/globalState.enum';

export function canActivateMain(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let router = inject(Router);
    let gState = inject(Store).selectSnapshot(ApplicationStateSelectors.globalState);
    if (gState == GlobalState.Logged) {
        return true;
    }
    else {
        router.navigate(['/auth']);
        return false;
    }

}

export function canActivateAdmin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let router = inject(Router);
    return inject(Store).select(ApplicationStateSelectors.globalState).pipe(
        take(1),
        map(value => {
            if (value == GlobalState.Logged) {
                return true;
            }
            else {
                router.navigate(['/auth']);
                return false;
            }
        })
    );
}

export function canActivateUser(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let router = inject(Router);
    return inject(Store).select(ApplicationStateSelectors.globalState).pipe(
        take(1),
        map(value => {
            if (value == GlobalState.Logged) {
                return true;
            }
            else {
                router.navigate(['/auth']);
                return false;
            }
        })
    );
}