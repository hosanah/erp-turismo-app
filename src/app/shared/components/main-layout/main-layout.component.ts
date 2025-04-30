import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  // Renamed to match the input property in sidebar component for mobile view
  mobileSidebarVisible: boolean = false;

  toggleSidebar() {
    // This toggles the visibility for the mobile sidebar
    this.mobileSidebarVisible = !this.mobileSidebarVisible;
  }

  // Potentially add logic here to control loading state globally
  isLoading: boolean = false; // Example: Control loading visibility
}

