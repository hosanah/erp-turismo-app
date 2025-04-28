// drivers.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
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
import { InputTextarea } from 'primeng/inputtextarea'; // Corrected import name
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
    InputTextarea, // Corrected usage
    ConfirmDialogModule,
    RippleModule,
    ToastModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] // Add NO_ERRORS_SCHEMA to ignore unknown properties
})
export class DriversModule { }
