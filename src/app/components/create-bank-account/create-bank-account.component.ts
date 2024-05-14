import { Component } from '@angular/core';
import { DropdownOption, DropdownOptions } from '../../utils/constants';
@Component({
	selector: 'app-create-bank-account',
	templateUrl: './create-bank-account.component.html',
	styleUrls: ['./create-bank-account.component.css'],
})
export class CreateBankAccountComponent {
	accountTypeOptions: DropdownOption[] = DropdownOptions.accountType;
	domesticCurrencyOptions: DropdownOption[] =
		DropdownOptions.domesticCurrencyCode;
	foreignCurrencyOptions: DropdownOption[] =
		DropdownOptions.foreignCurrencyCode;
	currencyAccountTypeOptions: DropdownOption[] =
		DropdownOptions.currencyAccountType;
}
