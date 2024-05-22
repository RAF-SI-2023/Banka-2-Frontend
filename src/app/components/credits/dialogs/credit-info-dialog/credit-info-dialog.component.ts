import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreditDto } from '../../../../dtos/credit-dto';
import { CreditService } from '../../../../services/bank-service/credit.service';

@Component({
	selector: 'app-credit-info-dialog',
	templateUrl: './credit-info-dialog.component.html',
	styleUrls: ['./credit-info-dialog.component.css'],
})
export class CreditInfoDialogComponent {
	newSelectedRow: CreditDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private creditService: CreditService,
	) {
		this.fetchData();
	}

	fetchData() {
		this.creditService
			.getFindByCreditNumber(this.data.selectedRow.creditNumber)
			.subscribe(response => {
				this.data.selectedRow = response;
				this.prepareValues();
				this.isLoading = false;
			});
	}

	prepareValues() {
		// Replace null or empty values with a placeholder
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
}
