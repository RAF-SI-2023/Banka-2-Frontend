import { Component } from '@angular/core';
import { CompanyDto } from 'src/app/dtos/company-dto';
import { CompanyService } from 'src/app/services/iam-service/company.service';
import { FormBuilder, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../../../../utils/validators';

@Component({
	selector: 'app-add-company-dialog',
	templateUrl: './add-company-dialog.component.html',
	styleUrls: ['./add-company-dialog.component.css'],
})
export class AddCompanyDialogComponent {
	createCompanyForm = this.fb.group({
		companyName: ['', [Validators.required]],
		faxNumber: ['', [Validators.required]],
		phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
		pib: [null, [Validators.required]],
		registryNumber: [null, [Validators.required]],
		identificationNumber: [null, Validators.required],
		activityCode: [null, [Validators.required]],
		address: ['', [Validators.required]],
	});

	constructor(
		private companyService: CompanyService,
		private fb: FormBuilder,
	) {}

	addCompany() {
		if (this.createCompanyForm.invalid) {
			return;
		}

		const companyDto = this.createCompanyForm
			.value as unknown as CompanyDto;

		this.companyService.postCreateCompany(companyDto).subscribe({
			next: response => {
				console.log(response);
			},
			error: error => {
				console.error(error);
			},
		});
	}
}
