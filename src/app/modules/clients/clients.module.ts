// clients.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ClientsRoutingModule } from "./clients-routing.module";
import { ClientListComponent } from "./client-list/client-list.component";

// Removed PrimeNG Modules
// import { TableModule } from 'primeng/table';
// import { ToolbarModule } from 'primeng/toolbar';
// import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';
// import { DialogModule } from 'primeng/dialog';
// import { InputMaskModule } from 'primeng/inputmask';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { RippleModule } from 'primeng/ripple';
// import { ToastModule } from 'primeng/toast';

// Added Angular Material Modules
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar"; // For notifications

// Added NgxMask
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [ClientListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientsRoutingModule,
    // Removed PrimeNG Modules
    // TableModule,
    // ToolbarModule,
    // ButtonModule,
    // InputTextModule,
    // DialogModule,
    // InputMaskModule,
    // ConfirmDialogModule,
    // RippleModule,
    // ToastModule,
    // Added Angular Material Modules
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatRippleModule,
    MatSnackBarModule,
    // Added NgxMask
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask() // Provide ngx-mask
    // ConfirmationService and MessageService are replaced by MatDialog and MatSnackBar, provided globally or injected directly
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // Keep if needed
})
export class ClientsModule {}

