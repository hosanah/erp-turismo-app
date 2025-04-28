// events-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';

export const EVENTS_ROUTES: Routes = [
  { path: '', component: EventListComponent },
  // Add routes for event details or creation if needed as separate pages
  // { path: 'new', component: EventFormComponent },
  // { path: ':id', component: EventDetailComponent },
  // { path: ':id/edit', component: EventFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(EVENTS_ROUTES)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
