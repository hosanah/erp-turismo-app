// reports.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core"; // Added schemas
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ReportsRoutingModule } from "./reports-routing.module";
import { ReportViewerComponent } from "./report-viewer/report-viewer.component";

// Added Angular Material Modules
import { MatSelectModule } from "@angular/material/select"; // For Dropdown
import { MatDatepickerModule } from "@angular/material/datepicker"; // For Calendar
import { MatNativeDateModule } from "@angular/material/core"; // Needed for Datepicker
import { MatInputModule } from "@angular/material/input"; // For InputNumber, InputText
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table"; // For Table
import { MatChipsModule } from "@angular/material/chips"; // For Tag
import { MatSnackBarModule } from "@angular/material/snack-bar"; // For Toast
import { MatIconModule } from "@angular/material/icon";

// Consider a charting library compatible with Angular Material (e.g., ngx-charts, Chart.js with ng2-charts)
// For now, remove ChartModule import and handle chart component replacement separately

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportsRoutingModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  providers: [
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], // Keep if needed
})
export class ReportsModule {}

