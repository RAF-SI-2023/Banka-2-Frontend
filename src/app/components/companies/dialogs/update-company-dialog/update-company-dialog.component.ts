import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, map, throwError } from 'rxjs';
import { CompanyService } from 'src/app/services/iam-service/company.service';
import { CompanyDto } from 'src/app/dtos/company-dto';
import { digitValidator } from 'src/app/utils/validators/digit.validator';
import { phoneNumberValidator } from 'src/app/utils/validators';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-update-company-dialog',
	templateUrl: './update-company-dialog.component.html',
	styleUrls: ['./update-company-dialog.component.css'],
})
export class UpdateCompanyDialogComponent {
	row = { ...this.data.selectedRow };

	updateCompanyForm = this.fb.group({
		companyName: ['', []],
		faxNumber: [null, [digitValidator()]],
		phoneNumber: [null, [phoneNumberValidator()]],
		pib: [null, [digitValidator()]],
		registryNumber: [null, [digitValidator()]],
		identificationNumber: [null, [digitValidator()]],
		activityCode: [null, [digitValidator()]],
		address: ['', []],
	});

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private companyService: CompanyService,
		private fb: FormBuilder,
	) {
		this.fetchRowData();
	}

	fetchRowData() {
		this.companyService
			.getFindCompanyById(this.row.id)
			.pipe(
				map(data => {
					this.row = data;
					for (const key of Object.keys(this.row)) {
						this.updateCompanyForm
							.get(key)
							?.setValue(this.row[key]);
					}
					return this.row;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	updateCompany(): void {
		if (this.updateCompanyForm.valid) {
			const companyDto = this.updateCompanyForm
				.value as unknown as CompanyDto;

			companyDto.id = this.row.id;

			this.companyService.putUpdateCompany(companyDto).subscribe({
				next: response => {
					console.log(response);
				},
				error: error => {
					console.error(error);
				},
			});
		}
	}
}
