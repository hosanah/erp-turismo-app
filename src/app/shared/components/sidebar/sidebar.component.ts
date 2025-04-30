import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';

// Placeholder interfaces - replace with actual models/services
interface Company {
  name: string;
  primaryColor: string;
  logo?: string;
}

interface User {
  name: string;
  role: string; // Example: 'ADMIN', 'USER'
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // Input/Output for mobile sidebar visibility (if controlled by parent)
  @Input() mobileSidebarVisible: boolean = false;
  @Output() mobileSidebarVisibleChange = new EventEmitter<boolean>();

  company: Company | null = {
    name: 'ERP Turismo',
    primaryColor: '#06b6d4' 
  };
  user: User | null = {
    name: 'Usuário Teste',
    role: 'ADMIN' 
  };

  menuItems: any[] = []; 

  ngOnInit() {
    this.menuItems = [
      { label: 'Dashboard', icon: 'pi pi-th-large', routerLink: ['/dashboard'], roles: ['ADMIN', 'USER'] },
      { label: 'Clientes', icon: 'pi pi-users', routerLink: ['/clients'], roles: ['ADMIN', 'USER'] },
      { label: 'Motoristas', icon: 'pi pi-id-card', routerLink: ['/drivers'], roles: ['ADMIN'] },
      { label: 'Parceiros', icon: 'pi pi-briefcase', routerLink: ['/partners'], roles: ['ADMIN'] },
      { label: 'Veículos', icon: 'pi pi-truck', routerLink: ['/vehicles'], roles: ['ADMIN', 'USER'] },
      { label: 'Eventos', icon: 'pi pi-calendar', routerLink: ['/events'], roles: ['ADMIN', 'USER'] },
      { label: 'Vendas', icon: 'pi pi-shopping-cart', routerLink: ['/sales'], roles: ['ADMIN'] },
      { label: 'Relatórios', icon: 'pi pi-chart-bar', routerLink: ['/reports'], roles: ['ADMIN'] },
      { label: 'Calendário', icon: 'pi pi-calendar-plus', routerLink: ['/calendar'], roles: ['ADMIN', 'USER'] },
    ];
  }

  hasPermission(roles?: string[]): boolean {
    if (!roles || roles.length === 0) {
      return true; 
    }
    return !!this.user && roles.includes(this.user.role);
  }

  logout() {
    console.log('Logout clicked');
    this.mobileSidebarVisible = false; 
    this.mobileSidebarVisibleChange.emit(false);
  }
}

