import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CompanyDto } from 'src/app/dtos/company-dto';
import { IamService } from 'src/app/services/iam.service';

@Component({
	selector: 'app-company-info-dialog',
	templateUrl: './company-info-dialog.component.html',
	styleUrls: ['./company-info-dialog.component.css'],
})
export class CompanyInfoDialogComponent {
	newSelectedRow: CompanyDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private iamServic: IamService,
	) {
		this.fetchData();
	}
	fetchData() {
		this.iamServic
			.getFindCompanyById(this.data.selectedRow.id)
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
