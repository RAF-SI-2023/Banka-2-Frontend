import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/iam-service/user.service';
import { AuthCredentialsDto } from 'src/app/dtos/auth-credentials-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from '../../utils/validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-password-change',
	templateUrl: './password-change.component.html',
	styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent {
	passwordChange: AuthCredentialsDto = { email: '', password: '' };

	changePasswordForm = this.fb.group({
		newPassword: ['', [Validators.required, passwordValidator()]],
		confirmPassword: ['', [Validators.required, passwordValidator()]],
	});

	constructor(
		private iamService: UserService,
		private fb: FormBuilder,
		private matSnackBar: MatSnackBar,
		public dialogRef: MatDialogRef<PasswordChangeComponent>,
	) {}

	onSubmit(): void {
		//check if new password and confirm password are the same
		if (
			this.changePasswordForm.value.newPassword !==
			this.changePasswordForm.value.confirmPassword
		) {
			this.matSnackBar.open('Lozinke se ne poklapaju!', 'Close', {
				duration: 5000,
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

		this.iamService
			.postPasswordChange(this.passwordChange)
			.subscribe(() => {
				this.dialogRef.close();
			});
	}
}
