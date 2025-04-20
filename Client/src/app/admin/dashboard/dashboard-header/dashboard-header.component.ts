import { Component, inject, output } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule} from 'primeng/avatar';
import { Menu, MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ApplicationStateSelectors } from 'state/application/application.selectors';
import { UserInfo } from 'models';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ThemeSwitcher } from "../../../core/components/theme-switcher/theme-switcher";
 
@Component({
  selector: 'dashboard-header',
  imports: [InputGroupModule, InputGroupAddonModule, ButtonModule, InputTextModule, AvatarModule, MenuModule, SplitButtonModule, OverlayBadgeModule, ThemeSwitcher],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {

  hideSidebar=output<void>();
  store: Store = inject(Store);

  avatarItems: MenuItem[] = [
    {
      label: $localize`Exit`,
      command: () => {
        this.store.reset;
        this.router.navigate(['/auth']);
      }
    }];

  router: Router = inject(Router);

  public get getUser(): UserInfo | undefined {
    let userInfo = this.store.selectSnapshot(ApplicationStateSelectors.userInfo);

    return userInfo;
  }

  enableDark(event: any) {
    setTimeout(() => {
          const element = document.querySelector('html');
    element?.classList.toggle('dark', event.target.checked);
    }, 150);

  }

  hide(){
    this.hideSidebar.emit();
  }
}
