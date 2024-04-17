import { Component } from '@angular/core';
import { CompanyDto } from 'src/app/dtos/company-dto';
import { CompanyService } from 'src/app/services/iam-service/company.service';

@Component({
	selector: 'app-add-company-dialog',
	templateUrl: './add-company-dialog.component.html',
	styleUrls: ['./add-company-dialog.component.css'],
})
export class AddCompanyDialogComponent {
	companyName = '';
	faxNumber = '';
	phoneNumber = '';
	pib = 0;
	registryNumber = 0;
	identificationNumber = 0;
	activityCode = 0;
	address = '';

	constructor(private companyService: CompanyService) {}

	addCompany() {
		const companyDto: CompanyDto = {
			id: 0,
			companyName: this.companyName,
			faxNumber: this.faxNumber,
			phoneNumber: this.phoneNumber,
			pib: this.pib,
			registryNumber: this.registryNumber,
			identificationNumber: this.identificationNumber,
			activityCode: this.activityCode,
			address: this.address,
		};

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
