import { Component, inject } from '@angular/core';
import { DashboardSidebarComponent } from './dashboard-sidebar/sidebar.component';
import { DashboardHeaderComponent } from "./dashboard-header/dashboard-header.component";
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from './models/menuItem';
import { MenuModule } from 'primeng/menu';
import { forkJoin } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserService, usersGroupService } from 'core';
import { CourcesService } from 'core/services/cources.service';
import { Administrator } from 'state/admin/admin.actions';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardSidebarComponent, DashboardHeaderComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  router = inject(Router)
  private userSrv = inject(UserService);
  private usersGpoupSrv = inject(usersGroupService);
  private store = inject(Store);
  private courcesSrv = inject(CourcesService)

  showSidepanel = true;

  items: MenuItem[] = [
    {
      label: $localize`Users`,
      header: true,
      opened: true,
      icon: 'pi-users',
      items: [
        {
          label: $localize`User administration`,
          icon: 'pi-user',
          routerLink: '/admin/users'
        },
        {
          label: $localize`Groups administration`,
          routerLink: '/admin/groups',
          icon: 'pi-users',
        },
        {
          label: $localize`Authentication setting`,
          routerLink: 'authsettings',
          icon: 'pi-cog',
        },
      ]
    },
    {
      label: $localize`Cources`,
      header: true,
      opened: true,
      icon:'pi-book', 
      items: [
        {
          label: $localize`Add cource`,
          icon: 'pi-cog',
          routerLink: '#'
        },
        {
          label: $localize`View all cources`,
          icon: 'pi-cog',
          routerLink: '/admin/cources'
        },
        {
          label: $localize`Add users to cources`,
          icon: 'pi-cog',
          routerLink: 'cources'
        },
      ]
    },
    {
      label: $localize`Media`,
      header: true,
      opened: true,
      icon: 'pi-copy',
      items: [
        {
          label: $localize`Manage media`,
          icon: 'pi-folder',
          routerLink: '#'
        },
        {
          label: $localize`Upload files`,
          icon: 'pi-upload',
          routerLink: '#'
        }
      ]
    }
  ];

  hide() {
    this.showSidepanel = !this.showSidepanel;

  }

  buttonClick() {
    this.router.navigate(['/admin/cources']);
  }

  ngOnInit(): void {
    forkJoin([
      this.userSrv.getAll(),
      this.usersGpoupSrv.getAll(),
      this.courcesSrv.getAll()
    ]).subscribe({
      next: (result) => {
        this.store.dispatch(new Administrator.SetUsers(result[0]));
        this.store.dispatch(new Administrator.SetUserGroups(result[1]));
        this.store.dispatch(new Administrator.SetCources(result[2]));
      }
    })
  }
}
