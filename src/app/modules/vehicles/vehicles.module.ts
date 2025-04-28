// vehicles.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextarea } from 'primeng/inputtextarea'; // Corrected import name
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    VehicleListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VehiclesRoutingModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    InputNumberModule,
    DropdownModule,
    InputTextarea, // Corrected usage
    TagModule,
    ConfirmDialogModule,
    RippleModule,
    ToastModule
  ]
})
export class VehiclesModule { }
