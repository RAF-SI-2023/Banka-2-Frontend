import { Component } from '@angular/core';
import { IamService } from '../../services/iam.service';
import { UserDto } from '../../dtos/user-dto';
import {
	isPrivateClientDto,
	PrivateClientDto,
} from '../../dtos/private-client-dto';
import {
	CorporateClientDto,
	isCorporateClientDto,
} from '../../dtos/corporate-client-dto';
import { PasswordChangeComponent } from '../password-change/password-change.component';
import { MatDialog } from '@angular/material/dialog';
import { Role } from '../../dtos/decoded-token-dto';
import { EmployeeDto } from '../../dtos/employee-dto';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
	// user, for now, represents ADMIN
	user: UserDto | null = null;
	employee: EmployeeDto | null = null;
	privateClient: PrivateClientDto | null = null;
	corporateClient: CorporateClientDto | null = null;
	isPrivateClient: boolean = false;
	isCorporateClient: boolean = false;
	isEmployee: boolean = false;

	constructor(
		private iamService: IamService,
		public dialog: MatDialog,
	) {}

	ngOnInit(): void {
		this.fetchUserData();
	}

	fetchUserData(): void {
		const id = Number(localStorage.getItem('id'));
		this.iamService.getFindById(id).subscribe({
			next: (user: UserDto) => {
				this.user = user;

				if (isPrivateClientDto(user)) {
					this.privateClient = user as PrivateClientDto;
					this.corporateClient = null;
				} else if (isCorporateClientDto(user)) {
					this.corporateClient = user as CorporateClientDto;
					this.privateClient = null;
				}
				if (user.role === Role.ADMIN) {
					this.isPrivateClient = false;
					this.isCorporateClient = false;
					this.isEmployee = false;
				} else if (user.role === Role.EMPLOYEE) {
					this.isPrivateClient = false;
					this.isCorporateClient = false;
					this.employee = user as EmployeeDto;
				}
			},
			error: error => {
				console.error(
					'Greška prilikom dohvatanja podataka o korisniku',
					error,
				);
			},
		});
	}

	setUserDetails(
		user: UserDto | PrivateClientDto | CorporateClientDto,
		isPrivate: boolean,
	): void {
		this.user = user;
		this.isPrivateClient = isPrivate;
		this.isCorporateClient = !isPrivate;
	}

	openPasswordChangeDialog(): void {
		const dialogRef = this.dialog.open(PasswordChangeComponent, {});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	protected readonly Role = Role;
}
