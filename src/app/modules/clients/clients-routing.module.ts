// clients-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';

export const CLIENTS_ROUTES: Routes = [
  { path: '', component: ClientListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(CLIENTS_ROUTES)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
