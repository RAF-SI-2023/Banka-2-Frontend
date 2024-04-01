import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {StockDto} from "../../../../dtos/stock-dto";
import {StockService} from "../../../../services/stock.service";

@Component({
  selector: 'app-stock-info-dialog',
  templateUrl: './stock-info-dialog.component.html',
  styleUrls: ['./stock-info-dialog.component.css']
})
export class StockInfoDialogComponent {

	newSelectedRow: StockDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private stockService: StockService,
	) {
		this.fetchData();
	}

	fetchData() {
		this.stockService.getFindById(this.data.selectedRow.id).subscribe((response) => {
			this.data.selectedRow = response;
			this.prepareValues();
			this.isLoading = false;
		});
	}
	prepareValues(){
		// replace null or empty values with a placeholder
		for (const key in this.data.selectedRow) {
			if (this.data.selectedRow[key] == null || this.data.selectedRow[key] == '') {
				this.data.selectedRow[key] = '-';
			}
		}
		this.newSelectedRow = { ...this.data.selectedRow };
	}
}
