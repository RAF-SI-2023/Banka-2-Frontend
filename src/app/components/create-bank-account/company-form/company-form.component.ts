import { Component, inject, Input } from '@angular/core';
import { DropdownOption } from '../../../utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import {
	bankAccountNumberValidator,
	emailValidator,
} from '../../../utils/validators';
import { AccountService } from '../../../services/bank-service/account.service';
import { BusinessAccountDto } from 'src/app/dtos/business-account-dto';
import { digitValidator } from 'src/app/utils/validators/digit.validator';

@Component({
	selector: 'app-company-form',
	templateUrl: './company-form.component.html',
	styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent {
	@Input() currencyOptions!: DropdownOption[];
	bankService = inject(AccountService);

	companyBankAccountForm = this.fb.group({
		accountNumber: [
			'',
			[Validators.required, bankAccountNumberValidator()],
		],
		email: ['', [Validators.required, emailValidator()]],
		currencyCode: ['', [Validators.required]],
		pib: ['', [Validators.required, digitValidator()]],
		identificationNumber: ['', [Validators.required, digitValidator()]],
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		if (this.companyBankAccountForm.valid) {
			const account = this.companyBankAccountForm
				.value as BusinessAccountDto;
			account.accountNumber = account.accountNumber.replaceAll('-', '');
			console.log(account);
			this.bankService
				.postCreateCompanyAccount(account)
				.subscribe(response => {
					console.log(response);
					this.companyBankAccountForm.reset();
				});
		}
	}
}
