// drivers-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverListComponent } from './driver-list/driver-list.component';

export const DRIVERS_ROUTES: Routes = [
  { path: '', component: DriverListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(DRIVERS_ROUTES)],
  exports: [RouterModule]
})
export class DriversRoutingModule { }
