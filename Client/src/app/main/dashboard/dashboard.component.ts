import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AdminDashboardComponent } from 'admin/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from 'admin/users/users.component';
import { UserInfo } from 'models';
import { ApplicationStateSelectors } from 'state/application/application.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    AdminDashboardComponent
  ]
})
export class DashboardComponent {

  public get getUser(): UserInfo | undefined {
    let userInfo = this.store.selectSnapshot(ApplicationStateSelectors.userInfo);

    return userInfo;
  }

  constructor(private store: Store) {

  }
}
