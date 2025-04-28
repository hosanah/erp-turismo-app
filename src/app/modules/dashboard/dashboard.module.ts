// dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

// PrimeNG Modules
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    DashboardRoutingModule,
    CardModule,
    ButtonModule,
    PanelModule,
    RippleModule,
    CurrencyPipe // Import CurrencyPipe here if using standalone, or provide it if needed globally
  ]
})
export class DashboardModule { }
