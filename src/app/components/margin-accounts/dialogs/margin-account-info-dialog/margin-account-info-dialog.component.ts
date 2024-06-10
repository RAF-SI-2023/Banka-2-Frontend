import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MarginAccountsService } from 'src/app/services/bank-service/margin-accounts.service';

@Component({
  selector: 'app-margin-account-info-dialog',
  templateUrl: './margin-account-info-dialog.component.html',
  styleUrls: ['./margin-account-info-dialog.component.css']
})
export class MarginAccountInfoDialogComponent {
  newSelectedRow = { ...this.data.selectedRow };
	isLoading = true;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private marginAccountsService: MarginAccountsService,
	) {
		this.fetchData();
	}

	fetchData() {
		this.marginAccountsService
			.getMarginsAccount(this.data.selectedRow.id)
			.subscribe(response => {
				this.data.selectedRow = response;
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
