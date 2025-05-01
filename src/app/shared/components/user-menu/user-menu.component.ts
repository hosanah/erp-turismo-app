import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Added
import { MatMenuModule } from '@angular/material/menu'; // Added
import { MatButtonModule } from '@angular/material/button'; // Added
import { MatIconModule } from '@angular/material/icon'; // Added
import { MatDividerModule } from '@angular/material/divider'; // Added for separator
// Removed: import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router'; // Added Router

interface Company {
  name: string;
  primaryColor: string;
}

interface User {
  name: string;
  email?: string;
}

// Define a structure for Material menu items
// Made label and icon optional to accommodate separators
interface MaterialMenuItem {
  label?: string; 
  icon?: string; // Material Icon name
  action?: () => void; // Optional action function
  route?: string; // Optional route
  separator?: boolean;
}

@Component({
  selector: 'app-user-menu',
  standalone: true, // Make it standalone
  imports: [ // Import necessary modules
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  // Changed to MaterialMenuItem structure
  menuItems: MaterialMenuItem[] = [];

  user: User | null = {
    name: 'Usuário Teste',
    email: 'teste@example.com'
  };
  company: Company | null = {
    name: 'ERP Turismo',
    primaryColor: '#06b6d4' // Example color
  };

  userInitials: string = '';

  constructor(
    private authService: AuthService,
    private router: Router // Inject Router
  ){}

  ngOnInit() {
    // Define menu items using MaterialMenuItem structure and Material Icons
    this.menuItems = [
      {
        label: 'Perfil',
        icon: 'account_circle', // Material Icon
        route: '/profile' // Example route
      },
      {
        label: 'Configurações',
        icon: 'settings', // Material Icon
        route: '/settings' // Example route
      },
      {
        separator: true
      },
      {
        label: 'Sair',
        icon: 'logout', // Material Icon
        action: () => { this.logout(); }
      }
    ];

    this.calculateInitials();
  }

  calculateInitials() {
    if (this.user && this.user.name) {
      const nameParts = this.user.name.split(' ').filter(part => part.length > 0);
      if (nameParts.length > 1) {
        this.userInitials = nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();
      } else if (nameParts.length === 1) {
        this.userInitials = nameParts[0].substring(0, 2).toUpperCase();
      }
    } else {
      this.userInitials = '??';
    }
  }

  // Method to handle menu item clicks
  handleMenuClick(item: MaterialMenuItem): void {
    if (item.action) {
      item.action();
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  logout() {
    this.authService.logout();
    // Optionally add snackbar notification here
    this.router.navigate(['/login']);
  }
}

