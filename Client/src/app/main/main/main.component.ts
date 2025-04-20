import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';

import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { PopoverModule } from 'primeng/popover';
import { SplitButtonModule } from 'primeng/splitbutton';


import { GlobalState } from 'state/models/globalState.enum';
import { UserInfo } from 'models';
import { ApplicationStateSelectors } from 'state/application/application.selectors';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [
    AvatarModule,
    BreadcrumbModule,
    ButtonModule,
    OverlayBadgeModule,
    SplitButtonModule,
    PopoverModule,
    RouterModule
  ]
})
export class MainComponent {

  breadCrumb: MenuItem[] = [
    { label: "Main", routerLink: "/main" }
  ]

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  avatarItems: MenuItem[] = [
    {
      label: $localize`Exit`,
      command: () => {
        this.store.reset;
        this.router.navigate(['/auth']);
      }
    }];

  public get getUser(): UserInfo | undefined {
    let userInfo = this.store.selectSnapshot(ApplicationStateSelectors.userInfo);

    return userInfo;
  }

  store: Store = inject(Store);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.router.events.subscribe(
      {
        next: (event) => {
          if (event instanceof NavigationEnd) {
            let a = this.activatedRoute
            console.log(1);
          }

        }
      }
    )
  }

}
