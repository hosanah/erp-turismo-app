// partners.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnerListComponent } from './partner-list/partner-list.component';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    PartnerListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PartnersRoutingModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    InputMaskModule,
    InputTextareaModule,
    ConfirmDialogModule,
    RippleModule,
    ToastModule
  ]
})
export class PartnersModule { }
