import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { CompanyService } from 'src/app/services/iam-service/company.service';

@Component({
	selector: 'app-update-company-dialog',
	templateUrl: './update-company-dialog.component.html',
	styleUrls: ['./update-company-dialog.component.css'],
})
export class UpdateCompanyDialogComponent {
	newSelectedRow = { ...this.data.selectedRow };

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private companyService: CompanyService,
	) {}

	updateCompany(): void {
		if (this.newSelectedRow != null) {
			// Convert dateOfBirth to epoch
			this.newSelectedRow.dateOfBirth = this.newSelectedRow.dateOfBirth
				? new Date(this.newSelectedRow.dateOfBirth).getTime().toString()
				: null;

			this.companyService
				.putUpdateCompany(this.newSelectedRow)
				.pipe(
					catchError(error => {
						console.error('Error loading data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe();
		}
	}
}
