import { Component, inject, Input } from '@angular/core';
import { DropdownOption } from '../../../utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import {
	bankAccountNumberValidator,
	emailValidator,
} from '../../../utils/validators';
import { AccountService } from '../../../services/bank-service/account.service';
import { DomesticAccountDto } from '../../../dtos/domestic-account-dto';
import { FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'app-domestic-form',
	templateUrl: './domestic-form.component.html',
	styleUrls: ['./domestic-form.component.css'],
})
export class DomesticFormComponent {
	@Input() currencyOptions!: DropdownOption[];
	@Input() domesticCurrencyAccountTypeOptions!: DropdownOption[];
	bankService = inject(AccountService);

	domesticBankAccountForm = this.fb.group({
		accountNumber: [
			'',
			[Validators.required, bankAccountNumberValidator()],
		],
		email: ['', [Validators.required, emailValidator()]],
		currencyCode: ['', [Validators.required]],
		domesticCurrencyAccountType: ['', [Validators.required]],
	});

	constructor(private fb: FormBuilder) {}

	onSubmit(formDirective: FormGroupDirective) {
		if (
			this.domesticBankAccountForm.valid &&
			this.domesticBankAccountForm
		) {
			const account = this.domesticBankAccountForm
				.value as DomesticAccountDto;
			account.accountNumber = account.accountNumber.replaceAll('-', '');
			console.log(account);
			this.bankService
				.postCreateDomesticAccount(account)
				.subscribe(response => {
					console.log(response);
					formDirective.resetForm();
					this.domesticBankAccountForm.reset();
				});
		}
	}
}
