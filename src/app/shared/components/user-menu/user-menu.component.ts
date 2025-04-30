import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  items: MenuItem[] = [];
  userInitials: "Teste";
  ngOnInit() {
    this.items = [
      {
        label: 'Perfil',
        icon: 'pi pi-user'
        // command: () => { /* Navegar para perfil */ }
      },
      {
        label: 'Configurações',
        icon: 'pi pi-cog'
        // command: () => { /* Navegar para configurações */ }
      },
      {
        separator: true
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out'
        // command: () => { /* Lógica de logout */ }
      }
    ];
  }
}

