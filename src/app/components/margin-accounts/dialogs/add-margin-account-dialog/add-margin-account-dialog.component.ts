import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MarginAccountDto } from 'src/app/dtos/margin-account-dto';
import { MarginAccountsService } from 'src/app/services/bank-service/margin-accounts.service';
import { DropdownOption, DropdownOptions } from 'src/app/utils/constants';

@Component({
	selector: 'app-add-margin-account-dialog',
	templateUrl: './add-margin-account-dialog.component.html',
	styleUrls: ['./add-margin-account-dialog.component.css'],
})
export class AddMarginAccountDialogComponent {
	currencyCodes: DropdownOption[] = DropdownOptions.currencyCodes;

	createAccountForm = this.fb.group({
		currencyCode: [null, [Validators.required]],
		balance: [null, [Validators.required]],
		loanValue: [null, [Validators.required]],
		maintenanceMargin: [null, [Validators.required]],
	});

	currencyCode!: string | '';

	constructor(
		private marginAccountsService: MarginAccountsService,
		private fb: FormBuilder,
	) {}

	addMarginAccount() {
		if (this.createAccountForm.valid) {
			const marginAccountDto = this.createAccountForm
				.value as unknown as MarginAccountDto;

			marginAccountDto.userId = Number(localStorage.getItem('id'));
			marginAccountDto.email = localStorage.getItem('email') || '';
			marginAccountDto.marginCall = true;
			console.log(marginAccountDto);

			this.marginAccountsService
				.postMarginsAccount(marginAccountDto)
				.subscribe({
					next: response => {
						console.log(response);
					},
					error: error => {
						console.error(error);
					},
				});
		} else {
			console.error('Form controls are null.');
		}
	}
}
