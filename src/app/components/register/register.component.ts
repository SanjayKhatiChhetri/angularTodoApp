import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    PasswordStrengthComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.value;
    this.authService.register(name, email, password).subscribe({
      next: () => {
        this.router.navigate(['/todos']);
      },
      error: (err: HttpErrorResponse) => {
        this.error =
          err.error.message || 'An error occurred during registration';
      },
    });
  }

  getErrorMessage(field: string): string {
    if (this.registerForm.get(field)?.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (this.registerForm.get(field)?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (this.registerForm.get(field)?.hasError('minlength')) {
      const minLength =
        this.registerForm.get(field)?.errors?.['minlength'].requiredLength;
      return `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } must be at least ${minLength} characters long`;
    }
    if (this.registerForm.hasError('mismatch') && field === 'confirmPassword') {
      return 'Passwords do not match';
    }
    return '';
  }
}
