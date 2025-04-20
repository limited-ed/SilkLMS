import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { MenuItem } from '../models/menuItem';
import { DashboardMenuComponent } from "../dashboard-menu/dashboard-menu.component";

 
@Component({
  selector: 'dashboard-sidebar',
  imports: [CommonModule, DashboardMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class DashboardSidebarComponent {

  items = input.required<MenuItem[]>();

  
}
