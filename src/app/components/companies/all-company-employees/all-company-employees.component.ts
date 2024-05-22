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
import { ActivatedRoute, Router } from '@angular/router';
import { isCompanyEmployeeDto } from 'src/app/dtos/company-employee-dto';
import { AddCompanyEmployeeComponent } from './dialogs/add-company-employee/add-company-employee.component';
import { UserInfoDialogComponent } from '../../users/dialogs/user-info-dialog/user-info-dialog.component';

@Component({
	selector: 'app-all-company-employees',
	templateUrl: './all-company-employees.component.html',
	styleUrls: ['./all-company-employees.component.css'],
})
export class AllCompanyEmployeesComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'email',
		'dateOfBirth',
		'phone',
		'address',
		'role',
		'pib',
	];
	dataSource: MatTableDataSource<UserDto>;
	selectedRow: UserDto | null = null;
	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;
	protected readonly validateHorizontalPosition = validateHorizontalPosition;

	pib = '';

	activeUser: UserDto | null = null;

	constructor(
		private userService: UserService,
		public dialog: MatDialog,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.dataSource = new MatTableDataSource();
		this.route.params.subscribe(params => {
			const paramsPib = params['pib'];
			if (paramsPib) {
				this.pib = paramsPib;
			} else {
				this.router.navigate(['/companies']);
			}
		});
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

	fetchAllData(): void {
		this.userService
			.getFindAll()
			.pipe(
				map((dataSource: UserDto[]) => {
					const companyEmployees = dataSource.filter(
						user =>
							isCompanyEmployeeDto(user) &&
							user.pib == Number(this.pib),
					);
					this.dataSource.data = companyEmployees;
					return companyEmployees;
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

	viewUser(row: UserDto): void {
		if (this.selectedRow != null) {
			this.dialog.open(UserInfoDialogComponent, {
				data: { selectedRow: row },
			});
		}
	}

	addEmployee() {
		const dialogRef = this.dialog.open(AddCompanyEmployeeComponent, {
			autoFocus: false,
			data: { pib: this.pib },
		});

		dialogRef.afterClosed().subscribe(() => {
			this.selectedRow = null;
			setTimeout(() => {
				this.fetchAllData();
			}, 1000);
		});
	}

	deleteEmployee() {
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
