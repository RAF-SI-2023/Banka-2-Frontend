import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/iam-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const loginGuard: CanActivateFn = () => {
	const router = inject(Router);
	const authService = inject(AuthService);
	const snackBar = inject(MatSnackBar);

	const token = authService.getToken();

	if (token && !authService.isTokenExpired()) {
		router.navigate(['/home']);
		snackBar.open('Već ste ulogovani!', 'Zatvori', {
			verticalPosition: 'top',
			horizontalPosition: 'center',
			duration: 3000,
		});
		return false;
	}

	return true;
};
