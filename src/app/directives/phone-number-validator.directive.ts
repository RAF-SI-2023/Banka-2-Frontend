import { Directive } from '@angular/core';
import {
	NG_VALIDATORS,
	Validator,
	AbstractControl,
	ValidationErrors,
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
