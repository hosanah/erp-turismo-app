// clients.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './client-list/client-list.component';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast'; // Needed for MessageService

// PrimeNG Services (provided in root, but confirm if needed here)
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    ClientListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientsRoutingModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    InputMaskModule,
    ConfirmDialogModule,
    RippleModule,
    ToastModule // Import ToastModule if using MessageService within this module's components
  ],
  providers: [
    // Services are typically provided in root, but if scoped, provide here
    // ConfirmationService, // Usually provided in root or AppComponent
    // MessageService // Usually provided in root or AppComponent
  ]
})
export class ClientsModule { }
