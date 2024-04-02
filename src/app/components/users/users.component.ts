import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { UserDto } from 'src/app/dtos/user-dto';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IamService } from 'src/app/services/iam.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDialogComponent } from './dialogs/update-user-dialog/update-user-dialog.component';
import { AddEmployeeDialogComponent } from './dialogs/add-employee-dialog/add-employee-dialog.component';
import { EmployeeDto } from 'src/app/dtos/employee-dto';
import { AddAgentDialogComponent } from './dialogs/add-agent-dialog/add-agent-dialog.component';
import { UserInfoDialogComponent } from "./dialogs/user-info-dialog/user-info-dialog.component";

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css'],
})
export class UsersComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'email',
		'username',
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
		private http: HttpClient,
		private authService: AuthService,
		private iamService: IamService,
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
	}

	selectRow(row: UserDto): void {
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

	updateUserDisabled(): boolean {
		if (
			this.selectedRow?.role == 'ADMIN' ||
			(this.activeUser?.role == 'EMPLOYEE' &&
				this.selectedRow?.role == 'EMPLOYEE')
		) {
			return true;
		}
		return false;
	}

	fetchAllData(): void {
		this.iamService
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

	fetchActiveUserData(): void {
		this.iamService
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

	activateEmployee(): void {
		if (this.selectedRow != null && this.selectedRow.role == 'EMPLOYEE') {
			this.iamService
				.putActivateEmployee(this.selectedRow.id)
				.pipe(
					catchError(error => {
						console.error('Error loading data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe(() => {
					this.fetchAllData();
					this.selectedRow = null;
				});
		}
	}

	deactivateEmployee(): void {
		if (this.selectedRow != null && this.selectedRow.role == 'EMPLOYEE') {
			this.iamService
				.putDeactivateEmployee(this.selectedRow.id)
				.pipe(
					catchError(error => {
						console.error('Error loading data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe(() => {
					this.fetchAllData();
					this.selectedRow = null;
				});
		}
	}

	addUser(): void {
		const dialogRef = this.dialog.open(AddEmployeeDialogComponent);

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
			this.selectedRow = null;
			this.fetchAllData();
		});
	}

	updateUser(): void {
		if (this.selectedRow != null) {
			const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
				data: { selectedRow: this.selectedRow },
			});

			dialogRef.afterClosed().subscribe(result => {
				console.log(`Dialog result: ${result}`);
				this.selectedRow = null;
				this.fetchAllData();
			});
		}
	}

	viewUser(row: UserDto): void {
		if (this.selectedRow != null) {
			const dialogRef = this.dialog.open(UserInfoDialogComponent, {
				data: { selectedRow: row },
			});
		}
	}

	deleteUser(): void {
		if (this.selectedRow != null) {
			this.iamService
				.delete(this.selectedRow.email)
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
	openAddAgentDialog(): void {
		const dialogRef = this.dialog.open(AddAgentDialogComponent, {
			width: '400px'
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('Dialog closed', result);
		});
	}
}
