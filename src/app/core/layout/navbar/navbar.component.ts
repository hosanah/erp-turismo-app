import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu'; // Using PrimeNG Menu for dropdown
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Adjust path as needed

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenuModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userMenuItems: MenuItem[] = [];
  systemName = 'ERP Turismo'; // Or fetch dynamically if needed

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.userMenuItems = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        command: () => {
          // Navigate to profile page - adjust route as needed
          this.router.navigate(['/profile']); 
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          // Reuse logout logic - ideally move to AuthService or LayoutService
          this.authService.logout();
          // Optionally add message service notification here
          this.router.navigate(['/login']);
        }
      }
    ];
  }
}

