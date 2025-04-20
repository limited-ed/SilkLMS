import { Component } from '@angular/core';


import { NgxsModule, Store } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { ApplicationState } from 'state/application/application.state';
import { Application } from 'state/application/application.actions';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [ RouterModule
  ]
})
export class AppComponent {
  title = 'ClientPrNG';
}
