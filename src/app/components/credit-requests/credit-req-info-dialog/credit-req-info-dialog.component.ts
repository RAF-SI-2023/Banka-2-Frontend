import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreditRequestDto } from 'src/app/dtos/credit-request-dto';
import { CreditService } from 'src/app/services/credit.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-credit-req-info-dialog',
	templateUrl: './credit-req-info-dialog.component.html',
	styleUrls: ['./credit-req-info-dialog.component.css'],
})
export class CreditReqInfoDialogComponent {
	newSelectedRow: CreditRequestDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private creditService: CreditService,
		private router: Router,
	) {
		this.fetchData();
	}

	fetchData() {
		this.creditService
			.getCreditRequestById(this.data.selectedRow.id)
			.subscribe(response => {
				this.data.selectedRow = response;
				this.prepareValues();
				this.isLoading = false;
			});
	}

	prepareValues() {
		// replace null or empty values with a placeholder
		for (const key in this.data.selectedRow) {
			if (
				this.data.selectedRow[key] == null ||
				this.data.selectedRow[key] == ''
			) {
				this.data.selectedRow[key] = '-';
			}
		}
		this.newSelectedRow = { ...this.data.selectedRow };
	}

	approveCreditReq() {
		this.creditService
			.postApproveCreditRequest(this.newSelectedRow.id)
			.subscribe({
				next: response => {
					console.log(response);
				},
				error: error => {
					console.error(error);
				},
			});
	}

	denyCreditReq() {
		this.creditService
			.putDenyCreditRequest(this.newSelectedRow.id)
			.subscribe({
				next: response => {
					console.log(response);
				},
				error: error => {
					console.error(error);
				},
			});
	}
}
