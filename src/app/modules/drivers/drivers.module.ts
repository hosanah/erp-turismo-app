// drivers.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DriversRoutingModule } from './drivers-routing.module';
import { DriverListComponent } from './driver-list/driver-list.component';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    DriverListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DriversRoutingModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    CalendarModule,
    InputMaskModule,
    InputTextareaModule,
    ConfirmDialogModule,
    RippleModule,
    ToastModule
  ]
})
export class DriversModule { }
