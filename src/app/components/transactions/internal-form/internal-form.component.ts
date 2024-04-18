import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountDto } from 'src/app/dtos/account-dto';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SimpleTransactionDto } from 'src/app/dtos/simple-transaction-dto';
import { AccountService } from 'src/app/services/bank-service/account.service';
import { TransactionService } from 'src/app/services/bank-service/transaction.service';
import { digitValidator } from 'src/app/utils/validators/digit.validator';

@Component({
	selector: 'app-internal-form',
	templateUrl: './internal-form.component.html',
	styleUrls: ['./internal-form.component.css'],
})
export class InternalFormComponent implements OnInit {
	accountService = inject(AccountService);
	transactionService = inject(TransactionService);

	bankAccounts: any;

	availableBalanceFromAcc = -1;
	currencyCodeFromAcc = '';
	availableBalanceToAcc = -1;
	currencyCodeToAcc = '';

	transactionForm = this.fb.group({
		senderAccountNumber: ['', [Validators.required]],
		receiverAccountNumber: ['', [Validators.required]],
		amount: [null, [Validators.required, digitValidator()]],
	});
	authService: any;

	accountOptionsSender: AccountDto[] = [];
	accountOptionsReciever: AccountDto[] = [];

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.getAccounts();
		this.transactionForm
			.get('senderAccountNumber') // Change fromAccount to senderAccountNumber
			?.valueChanges.subscribe(response => {
				this.getAccountBalance(response, true); // Pass true for FromAcc
			});
		this.transactionForm
			.get('receiverAccountNumber') // Change toAccount to receiverAccountNumber
			?.valueChanges.subscribe(response => {
				this.getAccountBalance(response, false); // Pass false for ToAcc
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
					this.accountOptionsReciever = Response;

					console.log(this.accountOptionsSender);
					return Response;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	onSubmit() {
		if (this.transactionForm.valid && this.transactionForm) {
			const transaction = this.transactionForm
				.value as unknown as SimpleTransactionDto;
			if (transaction.receiverAccountNumber) {
				transaction.receiverAccountNumber =
					transaction.receiverAccountNumber.replaceAll('-', '');
				console.log(transaction);
				this.transactionService
					.postTransactionInternal(transaction)
					.subscribe(response => {
						if (response.status == 'CONFIRMED') {
							// Update the available balance based on whether it's the sender or receiver account
							if (
								transaction.senderAccountNumber ===
								this.transactionForm.get('senderAccountNumber')
									?.value
							) {
								this.availableBalanceFromAcc -= response.amount;
							} else if (
								transaction.senderAccountNumber ===
								this.transactionForm.get(
									'receiverAccountNumber',
								)?.value
							) {
								this.availableBalanceToAcc -= response.amount;
							}

							this.transactionForm.reset();
							this.availableBalanceFromAcc = -1;
							this.availableBalanceToAcc = -1;
						} else {
							console.log(response);
						}
					});
			}
		}
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
				} else {
					this.availableBalanceToAcc = account.availableBalance;
					this.currencyCodeToAcc = account.currencyCode;
				}
			});
	}
}
