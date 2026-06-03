import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, CardModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  themeService = inject(ThemeService);

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  isLoading = false;

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;

    this.authService.register(this.registerForm.getRawValue() as any).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Account created successfully',
        });

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },

      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail: error?.error?.message ?? 'Unable to create account',
        });

        this.isLoading = false;
      },

      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onLogin() {
    this.router.navigate(['/']);
  }
}
