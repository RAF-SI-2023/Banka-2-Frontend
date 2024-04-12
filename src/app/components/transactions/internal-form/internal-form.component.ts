import { Component, OnInit, inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AccountDto } from 'src/app/dtos/account-dto';
import { InternalTransactionResponseDto } from 'src/app/dtos/internal-transaction-response-dto';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SimpleTransactionDto } from 'src/app/dtos/simple-transaction-dto';
import { AccountService } from 'src/app/services/bank-service/account.service';
import { TransactionService } from 'src/app/services/bank-service/transaction.service';

@Component({
	selector: 'app-internal-form',
	templateUrl: './internal-form.component.html',
	styleUrls: ['./internal-form.component.css'],
})
export class InternalFormComponent implements OnInit {
	accountService = inject(AccountService);
	transactionService = inject(TransactionService);

	bankAccounts: any;

	availableBalance: number = -1;
	currencyCode: string = '';

	transactionForm = this.fb.group({
		senderAccountNumber: ['', [Validators.required]],
		receiverAccountNumber: [
			'',
			[Validators.required /* bankAccountNumberValidator() */],
		],
		amount: ['', [Validators.required]],
	});
	authService: any;

	accountOptionsSender: AccountDto[] = [];
	accountOptionsReciver: AccountDto[] = [];

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		this.getAccounts();
		this.transactionForm
			.get('senderAccountNumber')
			?.valueChanges.subscribe(Response => {
				this.getAccountBalance(Response);
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
					this.accountOptionsReciver = Response;

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
		if (this.transactionForm.valid) {
			const currentEpochTimeMs = Date.now();

			const transaction = this.transactionForm
				.value! as unknown as SimpleTransactionDto;
			transaction.receiverAccountNumber =
				transaction.receiverAccountNumber.replaceAll('-', '');
			console.log(transaction);
			this.transactionService
				.postTransactionInternal(transaction)
				.subscribe(
					response => {
						if (response.status == 'CONFIRMED') {
							this.availableBalance =
								this.availableBalance - response.amount;
						} else {
							console.log(response);
						}
					},
					error => {
						console.log(error);
					},
				);
		}
	}

	getAccountBalance(accountNumber: any): void {
		const emailLocal = localStorage.getItem('email');
		if (!emailLocal) return;

		this.accountService
			.getFindByEmail(emailLocal)
			.subscribe((Response: any[]) => {
				this.availableBalance = Response.filter(
					data => data.accountNumber == accountNumber,
				)[0].availableBalance;
				console.log(this.availableBalance);
				this.currencyCode = Response.filter(
					data => data.accountNumber == accountNumber,
				)[0].currencyCode;
				console.log(this.availableBalance);
			});
	}

	// fetchAccounts(): void {
	// 	const emailLocal = localStorage.getItem("email");
	// 	if(!emailLocal) return;

	// 	this.accountService.getFindByEmail(emailLocal).pipe(
	// 		map(Response => {
	// 			this.accountOptionsSender = Response;
	// 			this.accountOptionsReciver = Response;

	// 			return Response;
	// 		}),
	// 		catchError(error => {
	// 			return throwError(() => error);
	// 		}),
	// 	).subscribe();
	// }

	selectAccountRow(arg0: any) {
		throw new Error('Method not implemented.');
	}
}
