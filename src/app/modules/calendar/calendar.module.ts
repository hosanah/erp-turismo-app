// calendar.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { InputTextareaModule } from 'primeng/inputtextarea';

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
    DropdownModule,
    ButtonModule,
    InputTextareaModule,
    FullCalendarModule // Usar FullCalendar em vez de ScheduleModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add schema to allow custom elements
})
export class CalendarModule { }
