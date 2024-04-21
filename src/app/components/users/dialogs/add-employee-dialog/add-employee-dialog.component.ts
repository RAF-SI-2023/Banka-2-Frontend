import { Component } from '@angular/core';
import { UserService } from 'src/app/services/iam-service/user.service';
import { EmployeeDto } from 'src/app/dtos/employee-dto';
import { FormBuilder, Validators } from '@angular/forms';
import {
	emailValidator,
	phoneNumberValidator,
} from '../../../../utils/validators';

@Component({
	selector: 'app-add-employee-dialog',
	templateUrl: './add-employee-dialog.component.html',
	styleUrls: ['./add-employee-dialog.component.css'],
})
export class AddEmployeeDialogComponent {
	availablePermissions: string[] = [
		'PERMISSION_1',
		'PERMISSION_2',
		'PERMISSION_3',
		'PERMISSION_4',
	];
	permissions: string[] = [];

	createEmployeeForm = this.fb.group({
		email: ['', [Validators.required, emailValidator()]],
		name: ['', [Validators.required]],
		surname: ['', [Validators.required]],
		gender: ['', [Validators.required]],
		dateOfBirth: ['', [Validators.required]],
		phone: ['', [Validators.required, phoneNumberValidator()]],
		address: ['', [Validators.required]],
		position: ['', [Validators.required]],
		department: ['', [Validators.required]],
		active: [true, [Validators.required]],
		permissions: [[]],
	});

	constructor(
		private userService: UserService,
		private fb: FormBuilder,
	) {}

	updatePermissions(event: any, permission: string) {
		if (event.checked) {
			this.permissions.push(permission);
		} else {
			this.permissions = this.permissions.filter(p => p !== permission);
		}
	}

	addEmployee() {
		if (this.createEmployeeForm.valid) {
			const dateOfBirthControl =
				this.createEmployeeForm.get('dateOfBirth');
			const permissionsControl =
				this.createEmployeeForm.get('permissions');

			if (dateOfBirthControl && permissionsControl) {
				const dateOfBirthValue = dateOfBirthControl.value;
				const dateOfBirthEpoch = dateOfBirthValue
					? new Date(dateOfBirthValue).getTime()
					: 0;
				const selectedPermissions = permissionsControl.value;

				this.createEmployeeForm.patchValue({
					dateOfBirth: dateOfBirthEpoch.toString(),
					permissions: selectedPermissions,
				});

				const employeeDto = this.createEmployeeForm
					.value as unknown as EmployeeDto;

				this.userService.postCreateEmployee(employeeDto).subscribe({
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
