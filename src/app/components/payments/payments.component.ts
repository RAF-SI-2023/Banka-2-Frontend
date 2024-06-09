import { Component, OnInit } from '@angular/core';
import { digitValidator } from 'src/app/utils/validators/digit.validator';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountDto } from 'src/app/dtos/account-dto';
import { AccountService } from 'src/app/services/bank-service/account.service';
import { DepositWithdrawalDto } from 'src/app/dtos/deposit-withdrawal-dto';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FormGroupDirective } from '@angular/forms';
import { bankAccountNumberValidator } from 'src/app/utils/validators';

@Component({
	selector: 'app-payments',
	templateUrl: './payments.component.html',
	styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
	availableBalanceFromAcc = -1;
	currencyCodeFromAcc = '';
	fromCurrency = 'RSD';

	depositWithdrawalSubtractionForm = this.fb.group({
		accountNumber: ['', [Validators.required]],
		amount: [
			'',
			[Validators.required, Validators.min(0), digitValidator()],
		],
	});
	depositWithdrawalAdditionForm = this.fb.group({
		accountNumber: [
			'',
			[Validators.required, bankAccountNumberValidator()],
		],
		amount: [
			'',
			[Validators.required, Validators.min(0), digitValidator()],
		],
	});
	accountOptionsSender: AccountDto[] = [];

	constructor(
		private accountService: AccountService,
		private fb: FormBuilder,
		public dialog: MatDialog,
	) {}

	ngOnInit(): void {
		this.getAccounts();
		this.depositWithdrawalSubtractionForm
			.get('accountNumber')
			?.valueChanges.subscribe(Response => {
				this.getAccountBalance(Response, true);
			});
	}

	getAccounts() {
		const emailLocal = localStorage.getItem('email');
		if (!emailLocal) return;

		this.accountService
			.getFindByEmail(emailLocal)
			.pipe(
				map(Response => {
					this.accountOptionsSender = Response;

					console.log(this.accountOptionsSender);
					return Response;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	getAccountBalance(accountNumber: any, isFromAccount: boolean): void {
		const emailLocal = localStorage.getItem('email');
		if (!emailLocal) return;

		this.accountService
			.getFindByEmail(emailLocal)
			.subscribe((Response: any[]) => {
				const account = Response.find(
					data => data.accountNumber == accountNumber,
				);
				if (!account) return; // Account not found

				if (isFromAccount) {
					this.availableBalanceFromAcc = account.availableBalance;
					this.currencyCodeFromAcc = account.currencyCode;
				}
			});
	}

	sendDepositWithdrawalAddition(formDirective: FormGroupDirective): void {
		if (this.depositWithdrawalAdditionForm.valid) {
			let depositWithdrawalDto = this.depositWithdrawalAdditionForm
				.value as unknown as DepositWithdrawalDto;
			depositWithdrawalDto.accountNumber =
				depositWithdrawalDto.accountNumber.replaceAll(/-/g, '');

			this.accountService
				.postDepositWithdrawalAddition(depositWithdrawalDto)
				.pipe(
					map(response => {
						console.log(response);
						formDirective.resetForm();
						this.depositWithdrawalAdditionForm.reset();
						this.getAccounts();
						this.availableBalanceFromAcc = -1;
					}),
					catchError(error => {
						console.error('Error loading data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe();
		}
	}

	sendDepositWithdrawalSubtraction(formDirective: FormGroupDirective): void {
		if (this.depositWithdrawalSubtractionForm.valid) {
			const depositWithdrawalDto = this.depositWithdrawalSubtractionForm
				.value as unknown as DepositWithdrawalDto;

			this.accountService
				.postDepositWithdrawalSubtraction(depositWithdrawalDto)
				.pipe(
					map(response => {
						console.log(response);
						formDirective.resetForm();
						this.depositWithdrawalSubtractionForm.reset();
						this.getAccounts();
						this.availableBalanceFromAcc = -1;
					}),
					catchError(error => {
						console.error('Error loading data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe();
		}
	}
}
