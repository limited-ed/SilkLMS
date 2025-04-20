import { Component, inject, input, model, output } from '@angular/core';
import { PrimeNg } from 'core';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PageEditComponent, PageEditResult } from '../page-edit/page-edit.component';

@Component({
  selector: 'app-page',
  imports: [...PrimeNg, DynamicDialogModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {


  page = input<number>();
  edit = output<number>();
  delete = output<number>();

}
