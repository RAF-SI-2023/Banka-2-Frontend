import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDto } from 'src/app/dtos/company-dto';
import { CompanyService } from 'src/app/services/iam-service/company.service';

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
		private router: Router,
		private companyService: CompanyService,
	) {
		this.fetchData();
	}

	fetchData() {
		this.companyService
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

	redirectToCompanyEmployees() {
		const pib = this.newSelectedRow.pib;
		this.router.navigate(['/companies', pib]);
	}
}
