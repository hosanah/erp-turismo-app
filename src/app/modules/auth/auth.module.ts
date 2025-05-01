// auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

// Removed PrimeNG Modules
// import { CardModule } from 'primeng/card';
// import { InputTextModule } from 'primeng/inputtext';
// import { PasswordModule } from 'primeng/password';
// import { CheckboxModule } from 'primeng/checkbox';
// import { ButtonModule } from 'primeng/button';

// Added Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Often needed with inputs/buttons

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    // Removed PrimeNG Modules
    // CardModule,
    // InputTextModule,
    // PasswordModule,
    // CheckboxModule,
    // ButtonModule,
    // Added Angular Material Modules
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AuthModule { }

