import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ExchangeDto } from 'src/app/dtos/exchange-dto';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
	selector: 'app-exchange-info-dialog',
	templateUrl: './exchange-info-dialog.component.html',
	styleUrls: ['./exchange-info-dialog.component.css'],
})
export class ExchangeInfoDialogComponent {
	newSelectedRow: ExchangeDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private exchangeService: ExchangeService,
	) {
		this.fetchData();
	}

	fetchData() {
		this.exchangeService
			.getFindById(this.data.selectedRow.id)
			.subscribe(response => {
				console.log(response);
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
