import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function digitValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;

		if (!value) {
			return null;
		}

		const pattern = /^\d+$/; // Match one or more digits
		const isValid = pattern.test(value);

		return isValid ? null : { containsNonDigits: true };
	};
}
