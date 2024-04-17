import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../../utils/validators';
import { DropdownOptions } from '../../utils/constants';
import { AccountService } from '../../services/bank-service/account.service';
import { CreditService } from '../../services/bank-service/credit.service';
import { CreditRequestDto } from '../../dtos/credit-request-dto';
import { AccountDto } from '../../dtos/account-dto';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../../services/iam-service/auth.service';
import { bankAccountNumberNoSymbolsValidator } from '../../utils/validators/bank-account-number-no-symbols.validator';

@Component({
	selector: 'app-create-credit-request',
	templateUrl: './create-credit-request.component.html',
	styleUrls: ['./create-credit-request.component.css'],
})
export class CreateCreditRequestComponent {
	currencyOptions = DropdownOptions.currencyCodes;
	accountNumberOptions: AccountDto[] = [];
	creditTypeOptions = DropdownOptions.creditType;

	creditRequestForm = this.fb.group({
		accountNumber: [
			'',
			[Validators.required, bankAccountNumberNoSymbolsValidator()],
		],
		creditType: ['', [Validators.required]],
		creditAmount: [0, [Validators.required]],
		mobileNumber: ['', [phoneNumberValidator()]],
		paymentPeriodMonths: [0, [Validators.required]],
		creditPurpose: [''],
		monthlySalary: [0],
		permanentEmployment: [false],
		employmentPeriod: [''],
		branch: [''],
		note: [''],
		educationLevel: [''],
		maritalStatus: [''],
		housingStatus: [''],
		ownCar: [false],
	});

	constructor(
		private fb: FormBuilder,
		private creditService: CreditService,
		private authService: AuthService,
		private bankService: AccountService,
	) {
		this.fetchAccountNumbers();
	}

	onSubmit() {
		if (this.creditRequestForm.valid && this.creditRequestForm) {
			if (this.creditRequestForm.value.creditPurpose === '') {
				this.creditRequestForm.value.creditPurpose =
					this.creditRequestForm.value.creditType;
			}

			const request = this.creditRequestForm
				.value as unknown as CreditRequestDto;
			request.accountNumber = request.accountNumber.replaceAll('-', '');
			console.log(request);
			this.creditService.postCreateCreditRequest(request).subscribe();
		}
	}

	fetchAccountNumbers() {
		const emailLocal = this.authService.getUserEmail();
		if (!emailLocal) return;

		this.bankService
			.getFindByEmail(emailLocal)
			.pipe(
				map(data => {
					this.accountNumberOptions = data;
					// Set value of account number to the first account number
					this.creditRequestForm.patchValue({
						accountNumber:
							this.accountNumberOptions[0].accountNumber,
					});
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}
}
