import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/iam-service/user.service';
import { AuthCredentialsDto } from 'src/app/dtos/auth-credentials-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-password-change-dialog',
	templateUrl: './password-change-dialog.component.html',
	styleUrls: ['./password-change-dialog.component.css'],
})
export class PasswordChangeDialogComponent {
	passwordChange: AuthCredentialsDto = { email: '', password: '' };

	changePasswordForm = this.fb.group({
		newPassword: ['', [Validators.required]],
		confirmPassword: ['', [Validators.required]],
	});

	constructor(
		private userService: UserService,
		private fb: FormBuilder,
		private matSnackBar: MatSnackBar,
		public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
	) {}

	onSubmit(): void {
		//check if new password and confirm password are the same
		if (
			this.changePasswordForm.value.newPassword !==
			this.changePasswordForm.value.confirmPassword
		) {
			this.matSnackBar.open('Lozinke se ne poklapaju!', 'Zatvori', {
				duration: 4000,
				horizontalPosition: 'center',
				verticalPosition: 'top',
			});
			return;
		}

		let email = localStorage.getItem('email');
		if (email == null) {
			email = '';
		}

		if (
			this.passwordChange &&
			email &&
			this.changePasswordForm.value.newPassword
		) {
			this.passwordChange = {
				email: email,
				password: this.changePasswordForm.value.newPassword,
			};
		}

		this.userService
			.postPasswordChange(this.passwordChange)
			.subscribe(() => {
				this.dialogRef.close();
			});
	}
}
