import { Component, effect, HostBinding, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// Removed: import { ToastModule } from 'primeng/toast';
// Removed: import { MessageService } from 'primeng/api';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from './shared/shared.module'; 
import { ThemeService } from './core/services/theme.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Added

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    // Removed: ToastModule,
    SharedModule, 
    MatSnackBarModule // Added
  ],
  // Removed: providers: [MessageService], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ERP Turismo';
  private themeService = inject(ThemeService);
  
  constructor(
    public authService: AuthService, 
    private router: Router,
    // Removed: private messageService: MessageService
    private snackBar: MatSnackBar // Added
  ) {}

  ngOnInit() {
    const currentColorTheme = this.themeService.getPreferredColorTheme();

    this.themeService.setColorTheme(currentColorTheme);
  }

  logout() {
    this.authService.logout();
    // Replaced: this.messageService.add({...});
    this.snackBar.open('Você foi desconectado com sucesso', 'Fechar', { // Added
      duration: 3000, // Example duration
      horizontalPosition: 'center', // Example position
      verticalPosition: 'top' // Example position
    });
    this.router.navigate(['/login']);
  }

}

