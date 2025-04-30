import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  mobileSidebarVisible: boolean = false;

  toggleSidebar() {
    this.mobileSidebarVisible = !this.mobileSidebarVisible;
  }
  isLoading: boolean = false;
}

