import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ForexDto } from 'src/app/dtos/forex-dto';
import { StockService } from 'src/app/services/stock-service/stock.service';
import { ForexService } from 'src/app/services/stock-service/forex.service';
import { AcquiredSecuritiesSellDialogComponent } from '../acquired-securities-sell-dialog/acquired-securities-sell-dialog.component'; 
import { AcquiredSecuritiesPostDialogComponent } from '../acquired-securities-post-dialog/acquired-securities-post-dialog.component'; 
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-acquired-securities-info-dialog',
	templateUrl: './acquired-securities-info-dialog.component.html',
	styleUrls: ['./acquired-securities-info-dialog.component.css'],
})
export class AcquiredSecuritiesInfoDialogComponent {
	newSelectedRow: ForexDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private stockService: StockService,
		private forexService: ForexService,
		public dialog: MatDialog,
	) {
		this.fetchData();
	}

	fetchData() {
		this.forexService
			.getFindByIdForex(this.data.selectedRow.id)
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

  sell(): void {
    this.dialog.open(AcquiredSecuritiesSellDialogComponent, {
      width: '400px',
      data: this.newSelectedRow, 
    });
  }

  post(): void {
    this.dialog.open(AcquiredSecuritiesPostDialogComponent, {
      width: '400px',
      data: this.newSelectedRow, 
    });
  }
}
