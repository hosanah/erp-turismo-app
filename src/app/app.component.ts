import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component'; // Importar MainLayoutComponent
import { SharedModule } from './shared/shared.module'; // Importar SharedModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToastModule,
    SharedModule, // Adicionar SharedModule aqui para disponibilizar os componentes
    // MainLayoutComponent // Ou importar diretamente se preferir
  ],
  providers: [MessageService], // AuthService já deve ser providedIn: 'root'
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ERP Turismo';

  constructor(
    public authService: AuthService, // Manter AuthService para lógica de autenticação
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // Lógica de inicialização, se necessário
  }

  // A função logout pode ser movida para o UserMenuComponent ou mantida aqui
  // Se movida, o UserMenuComponent precisará injetar AuthService e Router
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

