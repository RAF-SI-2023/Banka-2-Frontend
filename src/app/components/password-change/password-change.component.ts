import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IamService } from '../../services/iam.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthCredentialsDto } from 'src/app/dtos/auth-credentials-dto';

@Component({
	selector: 'app-password-change',
	templateUrl: './password-change.component.html',
	styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent {
	passwordChange: AuthCredentialsDto = { email: '', password: '' };
	newPassword: string = '';
	confirmPassword: string = '';

	constructor(
		private iamService: IamService,
		public dialogRef: MatDialogRef<PasswordChangeComponent>,
	) {}

	submit(): void {
		if (this.newPassword !== this.confirmPassword) {
			return;
		}

		let email = localStorage.getItem('email');
		if (email == null) {
			email = '';
		}

		this.passwordChange = {
			email: email,
			password: this.newPassword,
		};

		this.iamService
			.postChangePasswordRequest(this.passwordChange)
			.pipe(
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe(() => {
				(result: any) => {
					console.log(result);
				};
			});
	}

	formValid(): boolean {
		return (
			this.newPassword !== '' &&
			this.confirmPassword !== '' &&
			this.newPassword === this.confirmPassword
		);
	}
}
