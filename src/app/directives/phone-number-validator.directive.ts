import { Directive } from '@angular/core';
import {
	AbstractControl,
	NG_VALIDATORS,
	ValidationErrors,
	Validator,
} from '@angular/forms';
import { phoneNumberValidator } from '../utils/validators/phone-number.validator';

@Directive({
	selector: '[appPhoneNumberValidator]',
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: PhoneNumberValidatorDirective,
			multi: true,
		},
	],
})
export class PhoneNumberValidatorDirective implements Validator {
	validate(control: AbstractControl): ValidationErrors | null {
		return phoneNumberValidator()(control);
	}
}
