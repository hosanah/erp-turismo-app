// vehicles-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

export const VEHICLES_ROUTES: Routes = [
  { path: '', component: VehicleListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(VEHICLES_ROUTES)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
