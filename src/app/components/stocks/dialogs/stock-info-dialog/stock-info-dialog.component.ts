import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockDto } from '../../../../dtos/stock-dto';
import { StockService } from '../../../../services/stock-service/stock.service';
import { OptionService } from 'src/app/services/stock-service/option.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StockPopupComponent } from '../stock-popup/stock-popup.component';
import { PopupService } from '../../../../services/stock-service/popup.service';

@Component({
	selector: 'app-stock-info-dialog',
	templateUrl: './stock-info-dialog.component.html',
	styleUrls: ['./stock-info-dialog.component.css'],
})
export class StockInfoDialogComponent {
	newSelectedRow: StockDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private stockService: StockService,
		private optionService: OptionService,
		private popupService: PopupService,
		private router: Router,
	) {
		this.fetchData();
	}

	fetchData() {
		this.stockService
			.getFindById(this.data.selectedRow.id)
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

	viewOptionsPage() {
		const stockListing = this.newSelectedRow.symbol;

		this.optionService
			.getFindAllOptionsByStockListing(stockListing)
			.pipe(
				catchError((error: any) => {
					if (error.status === 404) {
						console.error('StockListing not found:', error);
					} else {
						console.error('Error fetching data:', error);
					}
					return throwError(() => error);
				}),
			)
			.subscribe(() => {
				this.router.navigate(['/options', stockListing]);
			});
	}

	openPopup() {
		this.popupService.openPopup();
	}


}
