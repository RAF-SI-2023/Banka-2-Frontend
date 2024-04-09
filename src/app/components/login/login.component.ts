import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/validators/email.validator';
import { AuthService } from '../../services/iam-service/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	authService = inject(AuthService);
	router = inject(Router);
	passwordHidden = true;
	serverResponseError = '';

	loginForm = this.fb.group({
		email: ['', [Validators.required, emailValidator()]],
		password: ['', [Validators.required]],
		remember: [false],
	});

	constructor(
		private fb: FormBuilder,
		public dialog: MatDialog,
	) {}

	onSubmit() {
		if (this.loginForm.valid) {
			this.authService
				.login({
					email: this.loginForm.value.email!,
					password: this.loginForm.value.password!,
				})
				.subscribe(
					() => {
						window.location.href = '/home';
						// this.router.navigate(['/home']);
					},
					error => {
						this.serverResponseError = 'Pogrešan email ili lozinka';
					},
				);
		} else {
			this.loginForm.markAllAsTouched();
		}
	}

	togglePasswordVisibility() {
		this.passwordHidden = !this.passwordHidden;
	}
}
