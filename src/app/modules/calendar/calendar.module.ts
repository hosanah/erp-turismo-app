// calendar.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar/calendar.component';

// PrimeNG Modules
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule as PrimeCalendarModule } from 'primeng/calendar'; // Alias to avoid name clash
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextarea } from 'primeng/inputtextarea'; // Corrected import name

// Adicionar importação do FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarRoutingModule,
    DialogModule,
    InputTextModule,
    PrimeCalendarModule,
    DropdownModule, // Ensure DropdownModule is imported
    ButtonModule,   // Ensure ButtonModule is imported
    InputTextarea,  // Corrected usage
    FullCalendarModule // Usar FullCalendar em vez de ScheduleModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] // Add NO_ERRORS_SCHEMA to ignore unknown properties
})
export class CalendarModule { }
