// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';

// Placeholder services - replace with actual services later
import { ClientService } from '../../core/services/client.service'; 
import { EventService } from '../../core/services/event.service';
import { SaleService } from '../../core/services/sale.service';
import { DriverService } from '../../core/services/driver.service';

@Component({
  selector: 'app-dashboard',
  standalone: false, // Part of a module
  // imports: [ CommonModule, RouterLink, CardModule, ButtonModule, PanelModule, RippleModule, CurrencyPipe ], // Moved to module
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activeClients: number = 0;
  upcomingEvents: number = 0;
  monthlySales: number = 0;
  availableDrivers: number = 0;

  // Inject placeholder services
  constructor(
    // private clientService: ClientService, 
    // private eventService: EventService,
    // private saleService: SaleService,
    // private driverService: DriverService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Placeholder data - replace with actual API calls
    this.activeClients = 150; // Example: Fetch from clientService
    this.upcomingEvents = 12; // Example: Fetch from eventService
    this.monthlySales = 25800.50; // Example: Fetch from saleService
    this.availableDrivers = 8; // Example: Fetch from driverService

    // Example API call structure (uncomment and adapt when services are ready)
    /*
    this.clientService.getActiveClientsCount().subscribe(count => this.activeClients = count);
    this.eventService.getUpcomingEventsCount().subscribe(count => this.upcomingEvents = count);
    this.saleService.getMonthlySalesTotal().subscribe(total => this.monthlySales = total);
    this.driverService.getAvailableDriversCount().subscribe(count => this.availableDrivers = count);
    */
  }
}
