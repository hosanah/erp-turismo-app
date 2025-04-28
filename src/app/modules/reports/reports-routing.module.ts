// reports-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';

export const REPORTS_ROUTES: Routes = [
  { path: '', component: ReportViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(REPORTS_ROUTES)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
