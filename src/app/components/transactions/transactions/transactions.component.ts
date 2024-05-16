import { Component } from '@angular/core';
import { DropdownOption, DropdownOptions } from 'src/app/utils/constants';
import { Router } from '@angular/router';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
	constructor(private router: Router) {}
	redirectToTransactionsAll() {
		this.router.navigate(['/transactions/all']);
	}

	transactionsTypeOptions: DropdownOption[] = DropdownOptions.transactionType;

	externaTransactionlOptions: DropdownOption[] =
		DropdownOptions.domesticCurrencyCode;
	internalTransactionlOptions: DropdownOption[] =
		DropdownOptions.foreignCurrencyCode;
}
