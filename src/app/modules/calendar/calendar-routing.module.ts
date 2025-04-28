// calendar-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

export const CALENDAR_ROUTES: Routes = [
  { path: '', component: CalendarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(CALENDAR_ROUTES)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
