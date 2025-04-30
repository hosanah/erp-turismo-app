import { Component, EventEmitter, Output, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Placeholder for Company data - replace with actual service/data
interface Company {
  name: string;
  primaryColor: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();

  // Placeholder for company data - inject a service later
  company: Company | null = {
    name: 'ERP Turismo',
    primaryColor: '#06b6d4' // Default cyan color
  };

  isDarkTheme: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize theme based on localStorage or system preference
      this.isDarkTheme = localStorage.getItem('theme') === 'dark' || 
                         (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.updateHtmlClass();
    }
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
      this.updateHtmlClass();
    }
  }

  private updateHtmlClass() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}

