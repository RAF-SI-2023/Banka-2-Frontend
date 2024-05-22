import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/iam-service/user.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
	selector: 'app-actuary-info-dialog',
	templateUrl: './actuary-info-dialog.component.html',
	styleUrls: ['./actuary-info-dialog.component.css'],
})
export class ActuaryInfoDialogComponent {
	newSelectedRow = { ...this.data.selectedRow };
	isLoading = true;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private userService: UserService,
	) {
		this.fetchData();
	}

	fetchData() {
		this.userService
			.getFindById(this.data.selectedRow.id)
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

	protected readonly Date = Date;
	protected readonly DatePipe = DatePipe;
	protected readonly formatDate = formatDate;
}
