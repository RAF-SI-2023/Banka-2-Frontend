import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { emailValidator } from 'src/app/utils/validators';
import { phoneNumberValidator } from 'src/app/utils/validators';
import { UserService } from 'src/app/services/iam-service/user.service';
import { CompanyEmployeeDto } from 'src/app/dtos/company-employee-dto';

@Component({
	selector: 'app-add-company-employee',
	templateUrl: './add-company-employee.component.html',
	styleUrls: ['./add-company-employee.component.css'],
})
export class AddCompanyEmployeeComponent {
	availablePermissions: string[] = [
		'PERMISSION_1',
		'PERMISSION_2',
		'PERMISSION_3',
		'PERMISSION_4',
	];
	permissions: string[] = [];

	createEmployeeForm = this.fb.group({
		email: ['', [Validators.required, emailValidator()]],
		dateOfBirth: ['', [Validators.required]],
		phone: ['', [Validators.required, phoneNumberValidator()]],
		address: ['', [Validators.required]],
	});

	constructor(
		private userService: UserService,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: { pib: string },
	) {}

	addEmployee() {
		if (this.createEmployeeForm.valid) {
			const dateOfBirthControl =
				this.createEmployeeForm.get('dateOfBirth');

			if (dateOfBirthControl) {
				const dateOfBirthValue = dateOfBirthControl.value;
				const dateOfBirthEpoch = dateOfBirthValue
					? new Date(dateOfBirthValue).getTime()
					: 0;

				this.createEmployeeForm.patchValue({
					dateOfBirth: dateOfBirthEpoch.toString(),
				});

				const createEmployeeDto = this.createEmployeeForm
					.value as unknown as CompanyEmployeeDto;
				createEmployeeDto.pib = Number(this.data.pib);

				this.userService
					.postCreateCompanyEmployee(createEmployeeDto)
					.subscribe({
						next: response => {
							console.log(response);
						},
						error: error => {
							console.error(error);
						},
					});
			} else {
				console.error('Form controls are null.');
			}
		}
	}
}
