import { Component, effect, HostBinding, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from './shared/shared.module'; 
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToastModule,
    SharedModule, 
  ],
  providers: [MessageService], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ERP Turismo';
  private themeService = inject(ThemeService);
  
  constructor(
    public authService: AuthService, 
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const currentColorTheme = this.themeService.getPreferredColorTheme();

    this.themeService.setColorTheme(currentColorTheme);
  }

  logout() {
    this.authService.logout();
    this.messageService.add({
      severity: 'success',
      summary: 'Logout',
      detail: 'Você foi desconectado com sucesso'
    });
    this.router.navigate(['/login']);
  }

}

