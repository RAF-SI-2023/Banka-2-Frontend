import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountDto } from 'src/app/dtos/account-dto';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AccountService } from 'src/app/services/bank-service/account.service';
import { TransactionService } from 'src/app/services/bank-service/transaction.service';
import { bankAccountNumberValidator } from 'src/app/utils/validators';
import { ExternalTransactionRequestDto } from 'src/app/dtos/external-transaction-request-dto';
import { MatDialog } from '@angular/material/dialog';
import { ExternalTransactionResponseDto } from 'src/app/dtos/external-transaction-response-dto';
import { VerifyTransactionDialogComponent } from '../verify-transaction-dialog/verify-transaction-dialog.component';
import { digitValidator } from 'src/app/utils/validators/digit.validator';

@Component({
	selector: 'app-external-form',
	templateUrl: './external-form.component.html',
	styleUrls: ['./external-form.component.css'],
})
export class ExternalFormComponent implements OnInit {
	accountService = inject(AccountService);
	transactionService = inject(TransactionService);

	bankAccounts: any;

	availableBalance = -1;
	currencyCode = '';

	transactionForm = this.fb.group({
		senderAccountNumber: ['', [Validators.required]],
		receiverAccountNumber: [
			'',
			[Validators.required, bankAccountNumberValidator()],
		],
		amount: [null, [Validators.required, digitValidator()]],
		transactionPurpose: ['', [Validators.required]],
		referenceNumber: ['', [Validators.required, digitValidator()]],
		transactionCode: ['', [Validators.required, digitValidator()]],
	});
	authService: any;

	accountOptionsSender: AccountDto[] = [];
	accountOptionsReciver: AccountDto[] = [];

	constructor(
		private fb: FormBuilder,
		public dialog: MatDialog,
	) {}

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
		if (this.transactionForm.valid && this.transactionForm) {
			const transaction = this.transactionForm
				.value as unknown as ExternalTransactionRequestDto;
			if (transaction.receiverAccountNumber) {
				transaction.receiverAccountNumber =
					transaction.receiverAccountNumber.replaceAll('-', '');
				this.transactionService
					.postTransactionExternal(transaction)
					.subscribe(response => {
						if (response.status == 'PENDING') {
							// this.accountBalance=this.accountBalance-response.amount;
							this.openConfirmDialog(response);
							// console.log(response);
						} else {
							console.log(response);
						}
					});
			}
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
				this.currencyCode = Response.filter(
					data => data.accountNumber == accountNumber,
				)[0].currencyCode;
				console.log(this.availableBalance);
			});
	}

	openConfirmDialog(response: ExternalTransactionResponseDto) {
		const dialogRef = this.dialog.open(VerifyTransactionDialogComponent, {
			autoFocus: false,
			data: { response },
		});

		dialogRef.afterClosed().subscribe(() => {
			this.transactionForm.reset();
			this.availableBalance = -1;
		});
	}
}
