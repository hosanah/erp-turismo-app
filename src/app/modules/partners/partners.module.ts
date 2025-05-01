// partners.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnerListComponent } from './partner-list/partner-list.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PartnersRoutingModule
  ]
})
export class PartnersModule { }
