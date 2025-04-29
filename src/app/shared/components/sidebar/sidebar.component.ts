import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() visible: boolean = false;
  menuItems: MenuItem[] = [];

  ngOnInit() {
    this.menuItems = [
      { label: 'Dashboard', icon: 'pi pi-th-large', routerLink: ['/dashboard'] },
      { label: 'Clientes', icon: 'pi pi-users', routerLink: ['/clients'] },
      { label: 'Motoristas', icon: 'pi pi-id-card', routerLink: ['/drivers'] },
      { label: 'Parceiros', icon: 'pi pi-briefcase', routerLink: ['/partners'] },
      { label: 'Veículos', icon: 'pi pi-truck', routerLink: ['/vehicles'] },
      { label: 'Eventos', icon: 'pi pi-calendar', routerLink: ['/events'] },
      { label: 'Vendas', icon: 'pi pi-shopping-cart', routerLink: ['/sales'] },
      { label: 'Relatórios', icon: 'pi pi-chart-bar', routerLink: ['/reports'] },
      { label: 'Calendário', icon: 'pi pi-calendar-plus', routerLink: ['/calendar'] },
      // Adicione mais itens conforme necessário
    ];
  }
}

