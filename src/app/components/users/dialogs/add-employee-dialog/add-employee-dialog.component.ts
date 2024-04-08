import { Component } from '@angular/core';
import { IamService } from 'src/app/services/iam.service';
import { EmployeeDto } from 'src/app/dtos/employee-dto';

@Component({
	selector: 'app-add-employee-dialog',
	templateUrl: './add-employee-dialog.component.html',
	styleUrls: ['./add-employee-dialog.component.css'],
})
export class AddEmployeeDialogComponent {
	email: string = '';
	name: string = '';
	surname: string = '';
	gender: string = '';
	dateOfBirth: any = 0;

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

	updatePermissions(event: any, permission: string) {
		if (event.checked) {
			this.permissions.push(permission);
		} else {
			this.permissions = this.permissions.filter(p => p !== permission);
		}
	}

	addEmployee() {
		// Convert dateOfBirth to epoch
		this.dateOfBirth = this.dateOfBirth
			? new Date(this.dateOfBirth).getTime().toString()
			: null;

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
