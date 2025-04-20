import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { IdentityUser, Group } from 'models';
import { MenuItem, TreeNode } from 'primeng/api';
import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserEditComponent } from 'admin/user-edit/user-edit.component';

@Component({
  selector: 'app-users',
  imports: [TreeModule, MenubarModule, TableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [DialogService]

})
export class UsersComponent {
  users!: IdentityUser[];
  usersByGroup!: IdentityUser[];
  selectedUser!: IdentityUser;
  groups!: Group[];

  nodes!: TreeNode[];

  menuItems: MenuItem[] = [
    { label: $localize`Add user`, icon: "pi pi-user-plus green", command: this.showEdit.bind(this) },
    { separator: true },
    { label: $localize`Edit`, icon: "pi pi-user-edit blue" },
    { label: $localize`Change password`, icon: "pi pi-key blue" },
    { label: $localize`Delete`, icon: "pi pi-user-minus red" }
  ];

  ref: DynamicDialogRef | undefined;
  dialogService: DialogService = inject(DialogService);

  constructor(private store: Store) {
    this.users = store.selectSnapshot((state) => state.AdministratorState.users);
    this.groups = store.selectSnapshot((state) => state.AdministratorState.usersGroups);

//    this.nodes = this.buildTreeNode(this.groups.filter(f => f.parentId == 0));  
  }


  nodeSelect(event: TreeNodeSelectEvent) {
   // this.usersByGroup = this.users.filter(f => f.groupId == event.node.data.id)
  }

  showEdit() {
    this.ref = this.dialogService.open(UserEditComponent, {
      header: "Edit", modal: true, closable: true, width: '40vw', breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    })
  }


  private buildTreeNode(groups: Group[]): TreeNode[] {
    const nodes: TreeNode[] = [];
    groups.forEach(group => {
      let node: TreeNode = {
        label: group.title,
        data: group
      }
      const children = this.groups.filter(f => f.parentId == group.id)
      if (children.length != 0) {
        node.children = this.buildTreeNode(children);
      }
      nodes.push(node);
    });
    return nodes;
  }


}
