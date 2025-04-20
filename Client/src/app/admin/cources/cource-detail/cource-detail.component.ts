import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';

import { State, Store } from '@ngxs/store';
import { Cource } from 'models';
import { TabsModule } from 'primeng/tabs';
import { PanelModule } from 'primeng/panel';
import { InputText } from 'primeng/inputtext'
import { IftaLabelModule } from 'primeng/iftalabel';
import { DividerModule } from 'primeng/divider'
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PartSelectComponent } from 'parts/part-select/part-select.component';


@Component({
  selector: 'app-cource-detail',
  imports: [TabsModule, PanelModule, InputText, IftaLabelModule, DividerModule, ButtonModule],
  providers: [DialogService],
  templateUrl: './cource-detail.component.html',
  styleUrl: './cource-detail.component.css'
})
export class CourceDetailComponent {

  id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'));

  cource = (inject(Store).selectSnapshot((state) => state.AdministratorState.cources) as Cource[]).find((f) => f.id === this.id);

  dialogService = inject(DialogService);

  router = inject(Router);

  ref: DynamicDialogRef | undefined;





  addClick() {
    this.ref = this.dialogService.open(PartSelectComponent, {
      header: $localize`Select part`,
      width: '500px',
      modal: true,
      contentStyle: { overflow: 'auto' },
      closable: true
    });
    this.ref.onClose.subscribe((res) => {
      if (res) {
        if (this.cource && !this.cource?.partItems) {
          this.cource.partItems = [];
        }
        this.cource?.partItems.push({
          id: 0,
          title: 'title',
          type: '',
          part: {}
        });
      }

    });
  }

  partDetail(partId: number) {
    this.router.navigate(['admin/cource', this.cource?.id, 'part', partId])
  }
}
