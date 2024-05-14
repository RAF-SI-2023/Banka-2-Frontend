import { Pipe, PipeTransform } from '@angular/core';
import { translateConstants } from '../utils/constants';

interface Translations {
	[key: string]: string;
}

@Pipe({
	name: 'translate',
})
export class TranslatePipe implements PipeTransform {
	transform(value: string): string {
		const translations: Translations = translateConstants;
		// Check if the value exists in the translation constant
		if (translations[value]) {
			return translations[value];
		} else {
			// If value doesn't exist, return the original value
			return value;
		}
	}
}
