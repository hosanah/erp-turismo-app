import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component'; // Corrected path
import { NavbarComponent } from '../navbar/navbar.component'; // Corrected path
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component'; // Corrected path

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,    // Add SidebarComponent
    NavbarComponent,     // Add NavbarComponent
    BreadcrumbComponent  // Add BreadcrumbComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

}

