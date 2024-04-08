import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {bankAccountNumberValidator, phoneNumberValidator} from "../../utils/validators";
import {DropdownOptions} from "../../utils/constants";
import {BankService} from "../../services/bank.service";
import {CreditService} from "../../services/credit.service";
import {DomesticAccountDto} from "../../dtos/domestic-account-dto";
import {CreateCreditRequestDto} from "../../dtos/create-credit-request-dto";
import {AccountDto} from "../../dtos/account-dto";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {bankAccountNumberNoSymbolsValidator} from "../../utils/validators/bank-account-number-no-symbols.validator";

@Component({
  selector: 'app-create-credit-request',
  templateUrl: './create-credit-request.component.html',
  styleUrls: ['./create-credit-request.component.css']
})
export class CreateCreditRequestComponent {
	currencyOptions = DropdownOptions.currencyCodes;
	accountNumberOptions: AccountDto[] = [];
	creditTypeOptions = DropdownOptions.creditType;

	creditRequestForm = this.fb.group({
		accountNumber: ['', [Validators.required, bankAccountNumberNoSymbolsValidator()]],
		creditType: ['', [Validators.required],],
		creditAmount: [0, [Validators.required]],
		currency: ['', [Validators.required]],
		mobileNumber: ['', [Validators.required, phoneNumberValidator()]],
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

	constructor(private fb: FormBuilder,
				private creditService: CreditService,
				private authService: AuthService,
				private bankService: BankService,
	) {
		this.fetchAccountNumbers();
	}

	onSubmit() {
		if (this.creditRequestForm.valid) {
			if(this.creditRequestForm.value.creditPurpose === ''){
				this.creditRequestForm.value.creditPurpose = this.creditRequestForm.value.creditType;
			}

			let request = this.creditRequestForm
				.value! as unknown as CreateCreditRequestDto;
			request.accountNumber = request.accountNumber.replaceAll('-', '');
			console.log(request);
			this.creditService.postCreateCreditRequest(request).subscribe(
				() => {
					alert('Credit request created successfully');
				},
				() => {
					alert('Error creating credit request');
				}
			);
		}
	}

	fetchAccountNumbers() {
		const emailLocal = this.authService.getUserEmail();
		if(!emailLocal) return;

		this.bankService.getFindByEmail(emailLocal).pipe(
			map(data => {
				this.accountNumberOptions = data;
				//set value of account number to the first account number
				this.creditRequestForm.patchValue({
					accountNumber: this.accountNumberOptions[0].accountNumber,
				});
			}),
			catchError(error => {
				return throwError(() => error);
			}),
		).subscribe();
	}
}
