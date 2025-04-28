// partners-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerListComponent } from './partner-list/partner-list.component';

export const PARTNERS_ROUTES: Routes = [
  { path: '', component: PartnerListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(PARTNERS_ROUTES)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
