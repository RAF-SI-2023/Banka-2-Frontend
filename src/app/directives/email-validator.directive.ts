import { Directive } from '@angular/core';
import { emailValidator } from '../utils/validators';
import {
	AbstractControl,
	NG_VALIDATORS,
	ValidationErrors,
	Validator,
} from '@angular/forms';

@Directive({
	selector: '[appEmailValidator]',
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: EmailValidatorDirective,
			multi: true,
		},
	],
})
export class EmailValidatorDirective implements Validator {
	validate(control: AbstractControl): ValidationErrors | null {
		return emailValidator()(control);
	}
}
