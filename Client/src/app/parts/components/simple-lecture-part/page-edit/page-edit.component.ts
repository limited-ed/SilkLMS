import { Component, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNg } from 'core';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';

export interface PageEditResult {
  success: boolean;
  num: number;
  text: string;

}

@Component({
  selector: 'app-page-edit',
  imports: [...PrimeNg, FormsModule],
  templateUrl: './page-edit.component.html',
  styleUrl: './page-edit.component.css'
})
export class PageEditComponent implements OnInit {

  text=input<string>('');
  num=input<number>(-1);

  editText='';

  dialog: DynamicDialogComponent;


  constructor(private ref: DynamicDialogRef, private dialogServise: DialogService) {
    this.dialog=dialogServise.getInstance(ref);
  }

  ngOnInit(): void {
    this.editText = this.text();
  }

  close(result: boolean) {
    this.ref.close({ success: result, num: this.num(), text: this.editText } as PageEditResult)
  }
}
