import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/bank-service/transaction.service';

@Component({
	selector: 'app-verify-transaction-dialog',
	templateUrl: './verify-transaction-dialog.component.html',
	styleUrls: ['./verify-transaction-dialog.component.css'],
})
export class VerifyTransactionDialogComponent {
	id: number = 0;
	activationCode: any = null;
	@Input() response: any = null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private transactionService: TransactionService,
	) {
		this.response = data.response;
	}

	sendActivationCode() {
		console.log(this.response);
		console.log(this.activationCode);
		this.transactionService
			.patchTransactionVerify(this.response.id, this.activationCode)
			.subscribe(response => {
				console.log(response);
			});
	}
}
