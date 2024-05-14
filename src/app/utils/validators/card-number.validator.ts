import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cardNumberValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;

		if (!value) {
			return null;
		}

		const pattern = /^\d{16}$/; // Format: 16 digits for card number
		const isValid = pattern.test(value);

		return isValid ? null : { invalidCardNumber: true };
	};
}
