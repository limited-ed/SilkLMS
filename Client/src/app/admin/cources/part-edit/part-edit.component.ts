import { Component, inject, OnInit } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Cource } from 'models';
import { PartItem } from 'models/parts/partItem';
import { IPartTypes, partTypes } from 'parts';

@Component({
  selector: 'app-part-edit',
  imports: [NgComponentOutlet],
  templateUrl: './part-edit.component.html',
  styleUrl: './part-edit.component.css'
})
export class PartEditComponent implements OnInit {

  route = inject(ActivatedRoute);

  store = inject(Store);

  editPart?:PartItem;
  part = {};
  
  ngOnInit(): void {
    let c=Number(this.route.snapshot.params["id"]);
    let p=Number(this.route.snapshot.params["partid"]);
    let cource = (this.store.selectSnapshot((state) => state.AdministratorState.cources) as Cource[]).find( f=> f.id===c);
    this.editPart=cource?.partItems.find(f=>f.id===p);
  }

  getComponent() {
    let name=this.editPart?.type?this.editPart?.type:"";
    let type= partTypes[name].component;
    this.part={}
    if (this.editPart?.part) {
      this.part=this.editPart.part
    }
    return type?type:null;
  }

}
