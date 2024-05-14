import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'accountNumberFormat',
})
export class AccountNumberFormatPipe implements PipeTransform {
	transform(accountNumber: string): string {
		if (!accountNumber) {
			return '';
		}

		// Assuming account number is formatted as '1234567890'
		const formattedAccount = accountNumber.replace(
			/(\d{3})(\d{4})(\d{3})/,
			'$1-$2-$3',
		);
		return formattedAccount;
	}
}
