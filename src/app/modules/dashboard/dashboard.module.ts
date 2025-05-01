// dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

// Added Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon'; 

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    DashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatRippleModule,
    MatIconModule,
    CurrencyPipe 
  ]
})
export class DashboardModule { }

