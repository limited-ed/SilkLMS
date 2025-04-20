import { Component, inject } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule  } from 'primeng/button'

interface Item {
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  type: string;
  selected?: boolean;
}


@Component({
  selector: 'app-part-select',
  imports: [DataViewModule, ButtonModule],
  providers: [DialogService],
  templateUrl: './part-select.component.html',
  styleUrl: './part-select.component.css'
})
export class PartSelectComponent {

  dlgServ= inject (DialogService);
  private ref = inject(DynamicDialogRef);
  selectedItem?: Item;

  items:Item[] = [
    {
      title: $localize`SCORM File`,
      type:"SCORM",
    },
    {
      title: $localize`Test`,
      type:"TEST",
    },
    {
      title: $localize`Lecture`,
      type: "Lecture",
    },
    {
      title: $localize`Video lesson`,
      type: "VIDEO",
    }
  ]

  select(type: string) {
    if (this.selectedItem) { this.selectedItem.selected = false }

    this.selectedItem = this.items.find( w => w.type === type);

    if (this.selectedItem) {this.selectedItem.selected = true;}

  }

  close() {
    this.ref.close(this.selectedItem?.type);
  }

}
