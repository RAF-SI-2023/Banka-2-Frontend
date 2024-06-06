import { Component } from '@angular/core';
import { DropdownOption, DropdownOptions } from 'src/app/utils/constants';
import { Router } from '@angular/router';

@Component({
	selector: 'app-money-transactions',
	templateUrl: './money-transactions.component.html',
	styleUrls: ['./money-transactions.component.css'],
})
export class MoneyTransactionsComponent {
	constructor(private router: Router) {}
	redirectToMoneyTransactionsAll() {
		this.router.navigate(['/money-transactions/all']);
	}

	transactionsTypeOptions: DropdownOption[] = DropdownOptions.transactionType;

	externaTransactionlOptions: DropdownOption[] =
		DropdownOptions.domesticCurrencyCode;
	internalTransactionlOptions: DropdownOption[] =
		DropdownOptions.foreignCurrencyCode;
}
