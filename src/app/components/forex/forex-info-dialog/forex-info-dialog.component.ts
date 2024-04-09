import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForexDto } from 'src/app/dtos/forex-dto';
import { StockService } from 'src/app/services/stock.service';

@Component({
	selector: 'app-forex-info-dialog',
	templateUrl: './forex-info-dialog.component.html',
	styleUrls: ['./forex-info-dialog.component.css'],
})
export class ForexInfoDialogComponent {
	newSelectedRow: ForexDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private stockService: StockService,
	) {
		this.fetchData();
	}

	fetchData() {
		this.stockService
			.getFindByIdForex(this.data.selectedRow.id)
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
}
