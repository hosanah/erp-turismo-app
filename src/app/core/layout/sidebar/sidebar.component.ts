import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; // Import Router
import { ButtonModule } from 'primeng/button';
import { PrimeIcons, MessageService } from 'primeng/api'; // Import MessageService
import { AuthService } from '../../services/auth.service'; // Adjust path as needed
import { ToastModule } from 'primeng/toast'; // Import ToastModule for MessageService

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterLinkActive, 
    ButtonModule,
    ToastModule // Add ToastModule
  ],
  providers: [MessageService], // Provide MessageService here or in Layout/App
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false; // State for sidebar collapse
  menuItems: any[] = []; // Placeholder for menu items
  primeIcons = PrimeIcons; // Make PrimeIcons accessible in the template

  // Inject AuthService, Router, MessageService
  constructor(
    public authService: AuthService, 
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // Define menu items - these should match the reference or existing app structure
    this.menuItems = [
      { label: 'Dashboard', icon: this.primeIcons.HOME, link: '/dashboard' },
      // Use actual routes from app.routes.ts or reference
      { label: 'Calendário', icon: this.primeIcons.CALENDAR, link: '/calendar' }, 
      { label: 'Clientes', icon: this.primeIcons.USERS, link: '/clients' },
      { label: 'Eventos', icon: this.primeIcons.TICKET, link: '/events' },
      { label: 'Vendas', icon: this.primeIcons.SHOPPING_CART, link: '/sales' },
      // Changed HANDSHAKE to BRIEFCASE as HANDSHAKE might not exist
      { label: 'Parceiros', icon: this.primeIcons.BRIEFCASE, link: '/partners' }, 
      { label: 'Motoristas', icon: this.primeIcons.CAR, link: '/drivers' },
      { label: 'Veículos', icon: this.primeIcons.TRUCK, link: '/vehicles' },
      { label: 'Relatórios', icon: this.primeIcons.CHART_BAR, link: '/reports' },
      // Add other main menu items here based on reference or app structure
      // Example from reference site (adjust icons/links as needed):
      // { separator: true, label: 'CONFIGURAÇÕES' }, 
      // { label: 'API Keys', icon: this.primeIcons.KEY, link: '/api-keys' },
      // { label: 'API Docs', icon: this.primeIcons.FILE, link: '/api-docs' },
      // { label: 'Segurança', icon: this.primeIcons.LOCK, link: '/seguranca' },
      // { label: 'Suporte', icon: this.primeIcons.QUESTION_CIRCLE, link: '/suporte' },
      // { label: 'Configurações', icon: this.primeIcons.COG, link: '/configuracoes' },
    ];
    // Add Admin link conditionally if needed, similar to original AppComponent
    // if (this.authService.isMasterUser()) { ... }
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // Implement logout function
  logout(): void {
    this.authService.logout();
    this.messageService.add({
      severity: 'success',
      summary: 'Logout',
      detail: 'Você foi desconectado com sucesso'
    });
    this.router.navigate(['/login']);
  }
}

