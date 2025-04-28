// sales-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleListComponent } from './sale-list/sale-list.component';

export const SALES_ROUTES: Routes = [
  { path: '', component: SaleListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(SALES_ROUTES)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
