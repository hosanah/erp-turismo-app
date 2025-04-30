import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';

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

  user: User | null = {
    name: 'Usuário Teste',
    email: 'teste@example.com'
  };
  company: Company | null = {
    name: 'ERP Turismo',
    primaryColor: '#06b6d4'
  };

  userInitials: string = '';

  constructor(
    private authService: AuthService
  ){}

  ngOnInit() {
    this.items = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
      },
      {
        label: 'Configurações',
        icon: 'pi pi-cog',
      },
      {
        separator: true
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => { this.logout(); }
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

  logout() {
    this.authService.logout()
  }
}

