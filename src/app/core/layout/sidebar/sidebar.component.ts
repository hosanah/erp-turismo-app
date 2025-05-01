import { Component, OnInit, inject } from '@angular/core'; // Added inject
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
// Removed: import { ButtonModule } from 'primeng/button';
// Removed: import { PrimeIcons, MessageService } from 'primeng/api';
// Removed: import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service'; // Adjust path as needed
import { MatListModule } from '@angular/material/list'; // Added
import { MatIconModule } from '@angular/material/icon'; // Added
import { MatButtonModule } from '@angular/material/button'; // Added
import { MatSnackBar } from '@angular/material/snack-bar'; // Added for logout message

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterLinkActive, 
    // Removed: ButtonModule,
    // Removed: ToastModule 
    MatListModule, // Added
    MatIconModule, // Added
    MatButtonModule // Added
  ],
  // Removed: providers: [MessageService], 
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false; // State for sidebar collapse
  menuItems: any[] = []; // Placeholder for menu items
  // Removed: primeIcons = PrimeIcons; 

  // Inject AuthService, Router, MatSnackBar
  constructor(
    public authService: AuthService, 
    private router: Router,
    // Removed: private messageService: MessageService
    private snackBar: MatSnackBar // Added
  ) { }

  ngOnInit(): void {
    // Define menu items - using Material Icon names (strings)
    this.menuItems = [
      { label: 'Dashboard', icon: 'home', link: '/dashboard' }, // Changed icon
      { label: 'Calendário', icon: 'calendar_today', link: '/calendar' }, // Changed icon
      { label: 'Clientes', icon: 'people', link: '/clients' }, // Changed icon
      { label: 'Eventos', icon: 'event', link: '/events' }, // Changed icon (using 'event' as 'ticket' might not fit)
      { label: 'Vendas', icon: 'shopping_cart', link: '/sales' }, // Kept icon
      { label: 'Parceiros', icon: 'business_center', link: '/partners' }, // Changed icon (briefcase)
      { label: 'Motoristas', icon: 'directions_car', link: '/drivers' }, // Changed icon
      { label: 'Veículos', icon: 'local_shipping', link: '/vehicles' }, // Changed icon (truck)
      { label: 'Relatórios', icon: 'bar_chart', link: '/reports' }, // Changed icon
      // Add other main menu items here based on reference or app structure
      // Example Material Icons:
      // { separator: true, label: 'CONFIGURAÇÕES' }, 
      // { label: 'API Keys', icon: 'vpn_key', link: '/api-keys' },
      // { label: 'API Docs', icon: 'description', link: '/api-docs' },
      // { label: 'Segurança', icon: 'security', link: '/seguranca' },
      // { label: 'Suporte', icon: 'help_outline', link: '/suporte' },
      // { label: 'Configurações', icon: 'settings', link: '/configuracoes' },
    ];
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // Implement logout function using MatSnackBar
  logout(): void {
    this.authService.logout();
    // Replaced: this.messageService.add({...});
    this.snackBar.open('Você foi desconectado com sucesso', 'Fechar', { // Added
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    this.router.navigate(['/login']);
  }
}

