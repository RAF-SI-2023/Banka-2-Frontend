import { Component, inject, Input } from '@angular/core';
import { DropdownOption } from '../../../utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import {
	bankAccountNumberValidator,
	emailValidator,
} from '../../../utils/validators';
import { BankService } from '../../../services/bank.service';
import { CompanyAccountDto } from 'src/app/dtos/company-account-dto';
@Component({
	selector: 'app-company-form',
	templateUrl: './company-form.component.html',
	styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent {
	@Input() currencyOptions!: DropdownOption[];
	bankService = inject(BankService);

	companyBankAccountForm = this.fb.group({
		accountNumber: [
			'',
			[Validators.required, bankAccountNumberValidator()],
		],
		email: ['', [Validators.required, emailValidator()]],
		currencyCode: ['', [Validators.required]],
		PIB: ['', [Validators.required]],
		identificationNumber: ['', [Validators.required]],
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		if (this.companyBankAccountForm.valid) {
			const account = this.companyBankAccountForm
				.value as CompanyAccountDto;
			account.accountNumber = account.accountNumber.replaceAll('-', '');
			console.log(account);
			this.bankService.postCreateCompanyAccount(account).subscribe(
				response => {
					console.log(response);
				},
				error => {
					console.log(error);
				},
			);
		}
	}
}
