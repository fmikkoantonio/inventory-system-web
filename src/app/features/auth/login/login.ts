import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, CardModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  themeService = inject(ThemeService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isLoading = false;

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;

    this.authService.login(this.loginForm.getRawValue() as any).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Welcome back!',
        });

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 500);
      },

      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: error?.error?.message ?? 'Invalid credentials',
        });

        this.isLoading = false;
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
