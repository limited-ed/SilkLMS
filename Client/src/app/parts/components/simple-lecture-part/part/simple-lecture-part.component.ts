import { Component, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimpleLecturePart } from 'models';
import { PrimeNg } from 'core';
import { PageComponent } from "../page/page.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PageEditComponent, PageEditResult } from '../page-edit/page-edit.component';

@Component({
  selector: 'app-simple-lecture-part',
  imports: [...PrimeNg, FormsModule, PageComponent],
  providers: [DialogService],
  templateUrl: './simple-lecture-part.component.html',
  styleUrl: './simple-lecture-part.component.css'
})
export class SimpleLecturePartComponent implements OnInit {

  part = input<SimpleLecturePart>();
  ref?: DynamicDialogRef;
  dialogService = inject(DialogService);

  ngOnInit(): void {

  }

  updatePage() {

  }

  addPage(){
    this.pageEdit(-1);
  }

  pageEdit(num: number) {
    this.ref = this.dialogService.open(PageEditComponent, {
      header: $localize`Edit page`,
      width: '70%',
      modal: true,
      closable: true,
      inputValues: {
        text: num > -1 ? this.part().pages[num] : '',
        num: num
      }
    });
    this.ref?.onClose.subscribe((res: PageEditResult) => {
      if (res && res.success) {
        if (res.num > -1)
          this.part().pages[res.num] = res.text;
        else
          this.part().pages.push(res.text);
      }
    });
  }
  
  pageDelete(num: number) {
    this.part().pages.splice(num, 1);
  }
}
