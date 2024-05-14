import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuturesContractDto } from 'src/app/dtos/futures-contract-dto';
import { FuturesContractService } from 'src/app/services/stock-service/futures-contract.service';

@Component({
	selector: 'app-futures-contract-info-dialog',
	templateUrl: './futures-contract-info-dialog.component.html',
	styleUrls: ['./futures-contract-info-dialog.component.css'],
})
export class FuturesContractInfoDialogComponent {
	newSelectedRow: FuturesContractDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private futuresContractService: FuturesContractService,
	) {
		this.fetchData();
	}

	fetchData() {
		this.futuresContractService
			.getFindByIdFutures(this.data.selectedRow.id)
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
