// events.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './event-list/event-list.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventsRoutingModule
  ]
  // Providers for ConfirmationService and MessageService are usually in root
})
export class EventsModule { }
