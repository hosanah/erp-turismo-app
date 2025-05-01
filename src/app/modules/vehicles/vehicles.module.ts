// vehicles.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core"; // Added schemas
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { VehiclesRoutingModule } from "./vehicles-routing.module";
import { VehicleListComponent } from "./vehicle-list/vehicle-list.component";

// Removed PrimeNG Modules
// import { TableModule } from \"primeng/table\";
// import { ToolbarModule } from \"primeng/toolbar\";
// import { ButtonModule } from \"primeng/button\";
// import { InputTextModule } from \"primeng/inputtext\";
// import { DialogModule } from \"primeng/dialog\";
// import { InputNumberModule } from \"primeng/inputnumber\";
// import { DropdownModule } from \"primeng/dropdown\";
// import { InputTextarea } from \"primeng/inputtextarea\";
// import { TagModule } from \"primeng/tag\";
// import { ConfirmDialogModule } from \"primeng/confirmdialog\";
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
import { MatSelectModule } from "@angular/material/select"; // For Dropdown
import { MatChipsModule } from "@angular/material/chips"; // For Tag
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar"; // For Toast

@NgModule({
  declarations: [VehicleListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VehiclesRoutingModule,
    // Removed PrimeNG Modules
    // TableModule,
    // ToolbarModule,
    // ButtonModule,
    // InputTextModule,
    // DialogModule,
    // InputNumberModule,
    // DropdownModule,
    // InputTextarea, // This was likely a component, not a module
    // TagModule,
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
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatRippleModule,
    MatSnackBarModule,
  ],
  providers: [
    // ConfirmationService and MessageService are replaced by MatDialog and MatSnackBar
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // Keep if needed for web components or complex templates
})
export class VehiclesModule {}

