import { Component } from '@angular/core';
import { DropdownOption, DropdownOptions } from 'src/app/utils/constants';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
	transactionsTypeOptions: DropdownOption[] = DropdownOptions.transactionType;

	externaTransactionlOptions: DropdownOption[] =
		DropdownOptions.domesticCurrencyCode;
	internalTransactionlOptions: DropdownOption[] =
		DropdownOptions.foreignCurrencyCode;
}
