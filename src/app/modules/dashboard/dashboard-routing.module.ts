// dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
