import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule for router-outlet
// Corrected import paths
import { SidebarComponent } from '../../../core/layout/sidebar/sidebar.component'; 
import { NavbarComponent } from '../../../core/layout/navbar/navbar.component'; 
import { BreadcrumbComponent } from '../../../core/layout/breadcrumb/breadcrumb.component'; 
import { LoadingComponent } from '../loading/loading.component'; // Import LoadingComponent

@Component({
  selector: 'app-main-layout',
  standalone: true, // Make it standalone
  imports: [ // Import necessary modules and components
    CommonModule,
    RouterModule,
    SidebarComponent,
    NavbarComponent,
    BreadcrumbComponent,
    LoadingComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  isLoading: boolean = false; // Keep isLoading if needed for app-loading
}

