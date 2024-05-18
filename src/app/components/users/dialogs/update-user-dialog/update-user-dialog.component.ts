import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isPrivateClientDto } from 'src/app/dtos/private-client-dto';
import { isCorporateClientDto } from 'src/app/dtos/corporate-client-dto';
import { isEmployeeDto } from 'src/app/dtos/employee-dto';
import { PrivateClientDto } from 'src/app/dtos/private-client-dto';
import { CorporateClientDto } from 'src/app/dtos/corporate-client-dto';
import { EmployeeDto } from 'src/app/dtos/employee-dto';
import { UserService } from 'src/app/services/iam-service/user.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { phoneNumberValidator } from '../../../../utils/validators';
import { EpochToDatePipe } from 'src/app/pipes/epoch-to-date.pipe';
import {
	CompanyEmployeeDto,
	isCompanyEmployeeDto,
} from 'src/app/dtos/company-employee-dto';

@Component({
	selector: 'app-update-user-dialog',
	templateUrl: './update-user-dialog.component.html',
	styleUrls: ['./update-user-dialog.component.css'],
})
export class UpdateUserDialogComponent {
	row = { ...this.data.selectedRow };

	updateUserForm = this.fb.group({
		dateOfBirth: [new Date(), []],
		phone: ['', [phoneNumberValidator()]],
		address: ['', []],
		name: ['', []],
		surname: ['', []],
		gender: ['', []],
		position: ['', []],
		department: ['', []],
		active: [true, []],
		permissions: [[]],
	});

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private userService: UserService,
		private fb: FormBuilder,
	) {
		this.fetchRowData();
		this.checkDto();
	}

	checkDto(): string {
		if (isPrivateClientDto(this.row)) {
			return 'PRIVATE';
		} else if (isCorporateClientDto(this.row)) {
			return 'CORPORATE';
		} else if (isCompanyEmployeeDto(this.row)) {
			return 'COMPANY-EMPLOYEE';
		} else if (isEmployeeDto(this.row)) {
			return 'EMPLOYEE';
		}
		return 'NONE';
	}

	fetchRowData() {
		this.userService
			.getFindById(this.row.id)
			.pipe(
				map(data => {
					this.row = data;
					for (const key of Object.keys(this.row)) {
						if (key === 'dateOfBirth') {
							const dateOfBirthEpoch = this.row[key];
							console.log(dateOfBirthEpoch);
							const epochToDatePipe = new EpochToDatePipe();
							const dateOfBirthDate =
								epochToDatePipe.transform(dateOfBirthEpoch);
							this.updateUserForm
								.get('dateOfBirth')
								?.setValue(dateOfBirthDate);
						} else if (this.updateUserForm.get(key)) {
							this.updateUserForm
								.get(key)
								?.setValue(this.row[key]);
						}
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

	updateUser(): void {
		if (this.updateUserForm.valid) {
			const dateOfBirthControl = this.updateUserForm.get('dateOfBirth');

			if (dateOfBirthControl) {
				const dateOfBirthValue = dateOfBirthControl.value;
				const dateOfBirthEpoch = dateOfBirthValue
					? new Date(dateOfBirthValue).getTime()
					: 0;

				if (this.checkDto() == 'PRIVATE') {
					const privateClientDto = this.updateUserForm
						.value as unknown as PrivateClientDto;

					privateClientDto.id = this.row.id;
					privateClientDto.email = this.row.email;
					privateClientDto.username = this.row.email;
					privateClientDto.dateOfBirth = dateOfBirthEpoch;
					privateClientDto.role = this.row.role;
					privateClientDto.permissions = this.row.permissions;
					privateClientDto.primaryAccountNumber =
						this.row.primaryAccountNumber;

					this.userService
						.putUpdatePrivateClient(privateClientDto)
						.subscribe({
							next: response => {
								console.log(response);
							},
							error: error => {
								console.error(error);
							},
						});
				} else if (this.checkDto() == 'CORPORATE') {
					const corporateClientDto = this.updateUserForm
						.value as unknown as CorporateClientDto;

					corporateClientDto.id = this.row.id;
					corporateClientDto.email = this.row.email;
					corporateClientDto.username = this.row.email;
					corporateClientDto.dateOfBirth = dateOfBirthEpoch;
					corporateClientDto.role = this.row.role;
					corporateClientDto.permissions = this.row.permissions;
					corporateClientDto.primaryAccountNumber =
						this.row.primaryAccountNumber;

					this.userService
						.putUpdateCorporateClient(corporateClientDto)
						.subscribe({
							next: response => {
								console.log(response);
							},
							error: error => {
								console.error(error);
							},
						});
				} else if (this.checkDto() == 'COMPANY-EMPLOYEE') {
					const companyEmployeeDto = this.updateUserForm
						.value as unknown as CompanyEmployeeDto;

					companyEmployeeDto.id = this.row.id;
					companyEmployeeDto.email = this.row.email;
					companyEmployeeDto.username = this.row.email;
					companyEmployeeDto.dateOfBirth = dateOfBirthEpoch;
					companyEmployeeDto.role = this.row.role;
					companyEmployeeDto.permissions = this.row.permissions;
					companyEmployeeDto.pib = this.row.pib;

					this.userService
						.putUpdateEmployee(companyEmployeeDto)
						.subscribe({
							next: response => {
								console.log(response);
							},
							error: error => {
								console.error(error);
							},
						});
				} else if (this.checkDto() == 'EMPLOYEE') {
					const employeeDto = this.updateUserForm
						.value as unknown as EmployeeDto;

					employeeDto.id = this.row.id;
					employeeDto.email = this.row.email;
					employeeDto.username = this.row.email;
					employeeDto.dateOfBirth = dateOfBirthEpoch;
					employeeDto.role = this.row.role;
					employeeDto.permissions = this.row.permissions;

					this.userService.putUpdateEmployee(employeeDto).subscribe({
						next: response => {
							console.log(response);
						},
						error: error => {
							console.error(error);
						},
					});
				} else {
					alert('Ovaj tip korisnika ne može da se menja.');
				}
			} else {
				console.error('Form controls are null.');
			}
		}
	}
}
