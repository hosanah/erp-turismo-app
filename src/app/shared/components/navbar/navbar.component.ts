import { Component, EventEmitter, Output, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

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
  filteredRoutes: { path: string, label: string }[] = [];
  searchTerm = '';
  showSuggestions = false;
  availableRoutes: { path: string, label: string }[] = [];

  company: Company | null = {
    name: 'ERP Turismo',
    primaryColor: '#06b6d4' // Default cyan color
  };



  isDarkTheme: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkTheme = localStorage.getItem('theme') === 'dark' || 
                         (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.updateHtmlClass();
    }
    this.loadAvailableRoutes();
  }

  private loadAvailableRoutes(): void {
    this.availableRoutes = [];
    
    this.router.config.forEach(route => {
      if (route.path && !['**', 'auth'].includes(route.path)) {
        this.processRoute(route);
      }
      
      if (route.children) {
        route.children.forEach(childRoute => {
          this.processRoute(childRoute, route.path);
        });
      }
    });
  }
  
  private processRoute(route: any, parentPath: string = ''): void {
    const fullPath = parentPath ? `${parentPath}/${route.path}` : `/${route.path}`;
    
    if (route.path && 
        !route.path.includes(':') && // Ignora rotas com parâmetros
        !route.path.includes('*') && // Ignora wildcards
        route.data?.showInSearch !== false) {
      
      this.availableRoutes.push({
        path: fullPath,
        label: route.data?.title || this.formatRouteName(route.path)
      });
    }
  }

  private formatRouteName(path: string): string {
    return path.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  searchRoutes(): void {
    if (this.searchTerm.trim().length > 1) {
      const term = this.searchTerm.toLowerCase();
      this.filteredRoutes = this.availableRoutes.filter(route =>
        route.label.toLowerCase().includes(term) ||
        route.path.toLowerCase().includes(term)
      );
      this.showSuggestions = true;
    } else {
      this.filteredRoutes = [];
      this.showSuggestions = false;
    }
  }

  navigateTo(routePath: string): void {
    this.router.navigate([routePath]).then(() => {
      this.searchTerm = '';
      this.showSuggestions = false;
      this.filteredRoutes = [];
    });
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.filteredRoutes.length > 0) {
      this.navigateTo(this.filteredRoutes[0].path);
    } else if (event.key === 'Escape') {
      this.showSuggestions = false;
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

