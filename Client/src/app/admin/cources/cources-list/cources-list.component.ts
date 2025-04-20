import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Cource } from 'models';
import { Router } from '@angular/router';

import { PrimeNg } from 'core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cources-list',
  imports: [...PrimeNg],
  templateUrl: './cources-list.component.html',
  styleUrl: './cources-list.component.css'
})
export class CourcesListComponent {

  router = inject(Router);
  store = inject(Store);
  cources = this.store.selectSnapshot((state) => state.AdministratorState.cources);
  menuItems: MenuItem [] = [
    {
      label: $localize`Edit`
    },
    {
      label: $localize`Clone`
    },
    {
      label: $localize`Delete`
    }
  ]

  view(item: Cource) {
    this.router.navigate(['/admin/cource',item.id]);
  }
  

}
