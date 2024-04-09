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
import { AccountDto } from 'src/app/dtos/account-dto';
import { CreditDto } from 'src/app/dtos/credit-dto';
import { MatTableDataSource } from '@angular/material/table';
import { CreditService } from 'src/app/services/credit.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BankService } from 'src/app/services/bank.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
	displayedAccountColumns: string[] = [
		'accountType',
		'accountNumber',
		'availableBalance',
	];
	user: UserDto | null = null; // USER, for now, represents ADMIN
	employee: EmployeeDto | null = null;
	privateClient: PrivateClientDto | null = null;
	corporateClient: CorporateClientDto | null = null;
	isPrivateClient: boolean = false;
	isCorporateClient: boolean = false;
	isEmployee: boolean = false;
	selectedAccount: AccountDto | null = null;
	dataSource = new MatTableDataSource<CreditDto>();
	accountNumberDataSource = new MatTableDataSource<AccountDto>();

	constructor(
		private iamService: IamService,
		public dialog: MatDialog,
		private creditService: CreditService,
		private bankService: BankService,
		private authService: AuthService,
	) {
		this.dataSource = new MatTableDataSource();
		this.accountNumberDataSource = new MatTableDataSource();
		this.fetchAccounts();
	}

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

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	fetchAllData(): void {
		if (!this.selectedAccount) return;

		this.creditService
			.getFindAll(this.selectedAccount.accountNumber.replaceAll('-', ''))
			.pipe(
				map(dataSource => {
					this.dataSource.data = dataSource;
					return dataSource;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	fetchAccounts(): void {
		const emailLocal = this.authService.getUserEmail();
		if (!emailLocal) return;

		this.bankService
			.getFindByEmail(emailLocal)
			.pipe(
				map(dataSource => {
					this.accountNumberDataSource.data = dataSource;
					this.selectAccountRow(dataSource[0]);
					return dataSource;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	selectAccountRow(row: AccountDto): void {
		if (this.selectedAccount?.accountNumber != row.accountNumber) {
			this.selectedAccount = row;
			this.fetchAllData();
		}
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
