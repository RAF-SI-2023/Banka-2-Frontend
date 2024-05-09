import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from '../services/bank-service/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const accountGuard: CanActivateFn = () => {
	const accountService = inject(AccountService);
	const toast = inject(MatSnackBar);
	if (!accountService.hasAccounts()) {
		toast.open(
			'Morate da imate bar jedan bankovni račun da bi ste pristupili ovoj stranici!',
			'Zatvori',
			{
				duration: 4000,
				horizontalPosition: 'center',
				verticalPosition: 'top',
				panelClass: ['app-notification-error'],
			},
		);
		return false;
	}
	return true;
};
