import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registeration',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registeration.component.html',
  styles: ``,
})
export class RegistrationComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/
            ),
          ],
        ],
        rePassword: ['', Validators.required],
        phone: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Password match validator
  passwordMatchValidator = (control: FormGroup) => {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  };

  onSubmit() {
    // Changed to camelCase to match template
    console.log('Form submission attempted'); // Debug log

    // Mark all fields as touched to show errors
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      console.log('Form is valid, submitting...'); // Debug log

      const { name, email, password, rePassword, phone } =
        this.registerForm.value;

      this.authService
        .register(name, email, password, rePassword, phone)
        .subscribe({
          next: (res) => {
            this.successMessage = res.message || 'Registration successful!';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (err) => {
            console.error('Registration error:', err);
            this.errorMessage =
              err.error?.message || 'Registration failed. Please try again.';
          },
        });
    } else {
      console.log('Form is invalid'); // Debug log
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }
}
