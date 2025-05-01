// calendar.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar/calendar.component';

// Added Angular Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Or MatMomentDateModule
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Often needed

// FullCalendar Module (Keep)
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FullCalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] 
})
export class CalendarModule { }

