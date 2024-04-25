import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserDto } from 'src/app/dtos/user-dto';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/services/iam-service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from './dialogs/update-user-dialog/update-user-dialog.component';
import { AddEmployeeDialogComponent } from './dialogs/add-employee-dialog/add-employee-dialog.component';
import { EmployeeDto } from 'src/app/dtos/employee-dto';
import { UserInfoDialogComponent } from './dialogs/user-info-dialog/user-info-dialog.component';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
})
export class UsersComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'email',
		'dateOfBirth',
		'phone',
		'address',
		'role',
		'active',
	];
	dataSource: MatTableDataSource<UserDto>;
	selectedRow: UserDto | null = null;
	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;
	protected readonly validateHorizontalPosition = validateHorizontalPosition;

	activeUser: UserDto | null = null;

	constructor(
		private userService: UserService,
		public dialog: MatDialog,
	) {
		this.dataSource = new MatTableDataSource();
		this.fetchAllData();
		this.fetchActiveUserData();
	}

	ngAfterViewInit() {
		if (this.paginator) this.dataSource.paginator = this.paginator;
		if (this.sort) this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}

		//pri filtriranju deslektuje korisnika i ako nadje samo 1 slektuje ga
		const filteredData = this.dataSource.filteredData;
		if (filteredData.length === 1) {
			this.selectedRow = filteredData[0];
		} else {
			this.selectedRow = null;
		}
	}

	selectRow(row: UserDto) {
		if (this.selectedRow?.id != row.id) {
			this.selectedRow = row;
		}
	}

	selectedRowRole(): string {
		return this.selectedRow?.role ?? '';
	}

	selectedRowActive(): boolean {
		return (this.selectedRow as EmployeeDto)?.active ?? false;
	}

	clearSelection() {
		this.selectedRow = null;
	}

	updateUserDisabled(): boolean {
		if (
			this.selectedRow?.role == 'ADMIN' ||
			this.selectedRow?.role == 'SUPERVISOR' ||
			this.selectedRow?.role == 'AGENT' ||
			(this.activeUser?.role == 'EMPLOYEE' &&
				this.selectedRow?.role == 'EMPLOYEE')
		) {
			return true;
		}
		return false;
	}

	deleteUserDisabled(): boolean {
		if (
			this.selectedRow?.role == 'ADMIN' ||
			(this.activeUser?.role == 'EMPLOYEE' &&
				(this.selectedRow?.role == 'EMPLOYEE'
					|| this.selectedRow?.role == 'SUPERVISOR'
					|| this.selectedRow?.role == 'AGENT'))
		) {
			return true;
		}
		return false;
	}

	fetchAllData() {
		this.userService
			.getFindAll()
			.pipe(
				map(dataSource => {
					this.dataSource.data = dataSource;
					return dataSource;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	fetchActiveUserData() {
		this.userService
			.getFindById(Number(localStorage.getItem('id')))
			.pipe(
				map(data => {
					this.activeUser = data;
					return this.activeUser;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	viewUser(row: UserDto) {
		if (this.selectedRow != null) {
			this.dialog.open(UserInfoDialogComponent, {
				data: { selectedRow: row },
				autoFocus: false,
			});
		}
	}

	activateEmployee() {
		if (this.selectedRow != null && this.selectedRow.role == 'EMPLOYEE') {
			this.userService
				.putActivateEmployee(this.selectedRow.id)
				.pipe(
					catchError(error => {
						console.error('Error loading data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe(() => {
					this.selectedRow = null;
					this.fetchAllData();
				});
		}
	}

	deactivateEmployee() {
		if (this.selectedRow != null && this.selectedRow.role == 'EMPLOYEE') {
			this.userService
				.putDeactivateEmployee(this.selectedRow.id)
				.pipe(
					catchError(error => {
						console.error('Error loading data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe(() => {
					this.selectedRow = null;
					this.fetchAllData();
				});
		}
	}

	addEmployee() {
		const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
			autoFocus: false,
		});

		dialogRef.afterClosed().subscribe(() => {
			this.selectedRow = null;
			setTimeout(() => {
				this.fetchAllData();
			}, 1000);
		});
	}

	updateUser() {
		if (this.selectedRow != null) {
			const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
				data: { selectedRow: this.selectedRow },
				autoFocus: false,
			});

			dialogRef.afterClosed().subscribe(() => {
				this.selectedRow = null;
				setTimeout(() => {
					this.fetchAllData();
				}, 1000);
			});
		}
	}

	deleteUser() {
		if (this.selectedRow != null) {
			this.userService
				.delete(this.selectedRow.email)
				.pipe(
					catchError(error => {
						console.error('Error loading data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe(() => {
					this.selectedRow = null;
					setTimeout(() => {
						this.fetchAllData();
					}, 1000);
				});
		}
	}
}
