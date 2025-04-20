import { Routes } from "@angular/router";



export const AdminRoutes: Routes = [
    { path: 'users', loadComponent: () => import("./users/users.component").then(c => c.UsersComponent) },
    { path: "groups", loadComponent: () => import("./groups/groups.component").then(c => c.GroupsComponent) },
    { path: "cources", loadComponent: () => import("./cources/cources-list/cources-list.component").then(c => c.CourcesListComponent) },
    { path: "cource/:id", loadComponent: () => import("./cources/cource-detail/cource-detail.component").then(c => c.CourceDetailComponent), data: { reuse: true }},
    {path: "cource/:id/part/:partid", loadComponent: () => import("./cources/part-edit/part-edit.component").then(c => c.PartEditComponent),}
    

]