// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
// Removed: import { MessageService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar'; // Added

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  returnUrl: string = '/dashboard'; // Default redirect after login
  hidePassword = true; // Added for password visibility toggle

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    // Removed: private messageService: MessageService
    private snackBar: MatSnackBar // Added
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    // Get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
        this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Mark fields as touched to show errors
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading = false;
        // Replaced: this.messageService.add({...});
        this.snackBar.open('Login bem-sucedido. Redirecionando...', 'Fechar', { // Added
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.isLoading = false;
        // Replaced: this.messageService.add({...});
        this.snackBar.open(error.message || 'Ocorreu um erro ao tentar fazer login.', 'Erro', { // Added
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'] // Optional: for custom styling
        });
      }
    });
  }
}

