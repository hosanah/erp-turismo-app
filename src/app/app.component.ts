import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
// Removed RouterLink, ButtonModule, AuthService, Router as they are no longer used directly here

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    ToastModule, // Keep ToastModule for global notifications
    // Removed RouterLink, ButtonModule
  ],
  providers: [MessageService], // Keep MessageService for global toasts
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ERP Turismo';

  // Removed constructor dependencies (AuthService, Router) and ngOnInit/logout methods
  constructor() {}

}

