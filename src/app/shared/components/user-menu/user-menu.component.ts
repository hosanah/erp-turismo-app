import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

// Placeholder interfaces - replace with actual models/services
interface Company {
  name: string;
  primaryColor: string;
}

interface User {
  name: string;
  email?: string;
}

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  items: MenuItem[] = [];

  // Placeholder data - replace with actual service injections
  user: User | null = {
    name: 'Usuário Teste',
    email: 'teste@example.com'
  };
  company: Company | null = {
    name: 'ERP Turismo',
    primaryColor: '#06b6d4' // Default cyan color
  };

  userInitials: string = '';

  ngOnInit() {
    this.items = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        // command: () => { /* Navegar para perfil */ }
      },
      {
        label: 'Configurações',
        icon: 'pi pi-cog',
        // command: () => { /* Navegar para configurações */ }
      },
      {
        separator: true
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => { this.logout(); } // Call logout method
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

  // Placeholder logout - replace with actual logic (e.g., AuthService)
  logout() {
    console.log('Logout clicked from UserMenu');
    // Add actual logout logic here (clear token, navigate to login, etc.)
  }
}

