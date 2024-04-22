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
import { digitValidator } from 'src/app/utils/validators/digit.validator';

@Component({
	selector: 'app-create-credit-request',
	templateUrl: './create-credit-request.component.html',
	styleUrls: ['./create-credit-request.component.css'],
})
export class CreateCreditRequestComponent {
	accountNumberOptions: AccountDto[] = [];
	creditTypeOptions = DropdownOptions.creditType;

	currencyCode = '';

	creditRequestForm = this.fb.group({
		accountNumber: [
			'',
			[Validators.required, bankAccountNumberNoSymbolsValidator()],
		],
		creditType: ['', [Validators.required]],
		creditAmount: [null, [Validators.required, digitValidator()]],
		mobileNumber: ['', [phoneNumberValidator()]],
		paymentPeriodMonths: [null, [Validators.required, digitValidator()]],
		creditPurpose: [''],
		monthlySalary: [null, [digitValidator()]],
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
		this.subscribeToAccountNumberChanges();
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
			this.creditService
				.postCreateCreditRequest(request)
				.subscribe(() => {
					this.creditRequestForm.reset();
				});
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
							this.accountNumberOptions[0]?.accountNumber || '',
					});
					this.currencyCode =
						this.accountNumberOptions[0]?.currencyCode || '';
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	private subscribeToAccountNumberChanges() {
		const accountNumberControl =
			this.creditRequestForm.get('accountNumber');
		if (accountNumberControl) {
			accountNumberControl.valueChanges.subscribe(accountNumber => {
				if (accountNumber != null) {
					const selectedAccount = this.accountNumberOptions.find(
						acc => acc.accountNumber === accountNumber,
					);
					this.currencyCode = selectedAccount?.currencyCode ?? '';
				}
			});
		}
	}
}
