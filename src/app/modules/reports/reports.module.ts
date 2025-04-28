// reports.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';

// PrimeNG Modules
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    ReportViewerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
    ChartModule,
    TagModule,
    InputTextModule,
    ToastModule
  ]
})
export class ReportsModule { }
