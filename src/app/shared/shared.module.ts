import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Removed PrimeNG Modules

// Added Angular Material Modules (Likely needed by shared components)
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // For LoadingComponent
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'; // Potentially for Sidebar/Menu

// Shared Components (Keep non-standalone ones)
// Removed UserMenuComponent as it's standalone
import { LoadingComponent } from './components/loading/loading.component';
// Removed MainLayoutComponent as it's standalone

// Import Standalone components used within MainLayoutComponent (if needed elsewhere, otherwise remove)
// These are likely only used by MainLayoutComponent, which imports them directly
// import { NavbarComponent } from '../core/layout/navbar/navbar.component';
// import { SidebarComponent } from '../core/layout/sidebar/sidebar.component';
// import { BreadcrumbComponent } from '../core/layout/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    // Removed standalone components: NavbarComponent, SidebarComponent, BreadcrumbComponent, UserMenuComponent
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // Removed PrimeNG Modules
    
    // Added Angular Material Modules
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,

    // Removed Standalone components used by MainLayoutComponent
  ],
  exports: [
    // Components
    // Removed UserMenuComponent as it's standalone
    LoadingComponent,
    // Removed MainLayoutComponent as it's standalone
    
    // Export Material Modules if needed by other modules importing SharedModule
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule
  ]
})
export class SharedModule { }

