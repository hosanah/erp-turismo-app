// sales.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core"; // Added schemas
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SalesRoutingModule } from "./sales-routing.module";
import { SaleListComponent } from "./sale-list/sale-list.component";

// Removed PrimeNG Modules
// import { TableModule } from \"primeng/table\";
// import { ToolbarModule } from \"primeng/toolbar\";
// import { ButtonModule } from \"primeng/button\";
// import { InputTextModule } from \"primeng/inputtext\";
// import { DialogModule } from \"primeng/dialog\";
// import { CalendarModule as PrimeCalendarModule } from \"primeng/calendar\"; // Alias
// import { InputNumberModule } from \"primeng/inputnumber\";
// import { InputTextarea } from \"primeng/inputtextarea\"; // Corrected import name
// import { DropdownModule } from \"primeng/dropdown\";
// import { ConfirmDialogModule } from \"primeng/confirmdialog\";
// import { TooltipModule } from \"primeng/tooltip\";
// import { RippleModule } from \"primeng/ripple\";
// import { ToastModule } from \"primeng/toast\";

// Added Angular Material Modules
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker"; // For Calendar
import { MatNativeDateModule } from "@angular/material/core"; // Needed for Datepicker
import { MatSelectModule } from "@angular/material/select"; // For Dropdown
import { MatTooltipModule } from "@angular/material/tooltip"; // For Tooltip
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar"; // For Toast

@NgModule({
  declarations: [SaleListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SalesRoutingModule,
    // Removed PrimeNG Modules
    // TableModule,
    // ToolbarModule,
    // ButtonModule,
    // InputTextModule,
    // DialogModule,
    // PrimeCalendarModule,
    // InputNumberModule,
    // InputTextarea, // This was likely a component, not a module
    // DropdownModule,
    // ConfirmDialogModule,
    // TooltipModule,
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
    MatDatepickerModule,
    MatNativeDateModule, // Ensure provider in root/core
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatRippleModule,
    MatSnackBarModule,
  ],
  providers: [
    // ConfirmationService and MessageService are replaced by MatDialog and MatSnackBar
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // Keep if needed
})
export class SalesModule {}

