import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Removed: import { MenuItem } from 'primeng/api';
// Removed: import { ButtonModule } from 'primeng/button';
// Removed: import { MenuModule } from 'primeng/menu'; 
import { Router, RouterModule } from '@angular/router'; // Added RouterModule
import { AuthService } from '../../services/auth.service'; // Adjust path as needed
import { MatButtonModule } from '@angular/material/button'; // Added
import { MatMenuModule } from '@angular/material/menu'; // Added
import { MatIconModule } from '@angular/material/icon'; // Added
import { MatToolbarModule } from '@angular/material/toolbar'; // Added for structure
import { ThemeService } from '../../services/theme.service'; // Added for theme toggle

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, // Added
    // Removed: ButtonModule, 
    // Removed: MenuModule,
    MatButtonModule, // Added
    MatMenuModule, // Added
    MatIconModule, // Added
    MatToolbarModule // Added
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // Removed: userMenuItems: MenuItem[] = []; - Menu items will be in the template
  systemName = 'ERP Turismo'; // Or fetch dynamically if needed
  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.isDarkMode;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Menu items logic moved to methods called from template
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']); 
  }

  logout(): void {
    this.authService.logout();
    // Optionally add snackbar notification here (using MatSnackBar injected elsewhere or via a service)
    this.router.navigate(['/login']);
  }

  toggleTheme(): void {
    this.themeService.toggleColorTheme();
  }
}

