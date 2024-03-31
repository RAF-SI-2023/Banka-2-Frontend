import { Component } from '@angular/core';
import { IamService } from 'src/app/services/iam.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EmployeeDto } from 'src/app/dtos/employee-dto';

@Component({
	selector: 'app-add-dialog',
	templateUrl: './add-dialog.component.html',
	styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent {
	email: string = '';
	name: string = '';
	surname: string = '';
	gender: string = '';
	dateOfBirth: number = 0;

	phone: string = '';
	address: string = '';

	position: string = '';
	department: string = '';
	active: boolean = true;

	availablePermissions: string[] = [
		'PERMISSION_1',
		'PERMISSION_2',
		'PERMISSION_3',
		'PERMISSION_4',
	];
	permissions: string[] = [];

	constructor(private iamService: IamService) {}

	onDateChange(event: MatDatepickerInputEvent<Date>) {
		this.dateOfBirth = Number(
			event.value ? event.value.getTime().toString() : '',
		);
	}

	updatePermissions(event: any, permission: string) {
		if (event.checked) {
			this.permissions.push(permission);
		} else {
			this.permissions = this.permissions.filter(p => p !== permission);
		}
	}

	addUser() {
		const employeeDto: EmployeeDto = {
			id: 0,
			dateOfBirth: Number(this.dateOfBirth.toString()),
			email: this.email,
			username: this.email,
			phone: this.phone,
			address: this.address,
			role: 'EMPLOYEE',
			permissions: this.permissions,
			name: this.name,
			surname: this.surname,
			gender: this.gender,
			position: this.position,
			department: this.department,
			active: this.active,
		};

		this.iamService.postCreateEmployee(employeeDto).subscribe({
			next: response => {
				console.log(response);
			},
			error: error => {
				console.error(error);
			},
		});
	}
}
