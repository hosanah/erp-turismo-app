// sales.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SalesRoutingModule } from './sales-routing.module';
import { SaleListComponent } from './sale-list/sale-list.component';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule as PrimeCalendarModule } from 'primeng/calendar'; // Alias
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextarea } from 'primeng/inputtextarea'; // Corrected import name
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    SaleListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SalesRoutingModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    PrimeCalendarModule,
    InputNumberModule,
    InputTextarea, // Corrected usage
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    RippleModule,
    ToastModule
  ]
  // Providers for ConfirmationService and MessageService are usually in root
})
export class SalesModule { }
