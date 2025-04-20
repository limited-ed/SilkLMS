import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'auth/login/login.component';
import { canActivateMain } from "core"
import { AdminRoutes } from "./admin/admin.routes";


export const routes: Routes = [
  { path: '', loadComponent: () => import('./hello/hello.component').then(comp => comp.HelloComponent), pathMatch: 'full' },
  { path: 'auth', component: LoginComponent },
  {
    path: 'admin', loadComponent: () => import('./admin/dashboard/dashboard.component').then(c => c.DashboardComponent), canActivate: [canActivateMain], children: AdminRoutes
  },

];
