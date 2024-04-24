import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/iam-service/auth.service';
import { UserDto } from 'src/app/dtos/user-dto';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from 'src/app/services/iam-service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ActuaryInfoDialogComponent } from './actuary-info-dialog/actuary-info-dialog.component';
import { AddAgentDialogComponent } from './add-agent-dialog/add-agent-dialog.component';

@Component({
	selector: 'app-actuaries',
	templateUrl: './actuaries.component.html',
	styleUrls: ['./actuaries.component.css'],
})
export class ActuariesComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'email',
		'dateOfBirth',
		'phone',
		'address',
		'role',
		'userLimit',
		'leftOfLimit',
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
		private userService: UserService,
		public dialog: MatDialog,
	) {
		this.dataSource = new MatTableDataSource();
		this.fetchAllData();
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
				map(dataSource => {
					const agents = dataSource.filter(
						user =>
							user.role === 'AGENT' || user.role === 'SUPERVISOR',
					);
					this.dataSource.data = agents;
					return agents;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	resetLeftOfLimitDisabled(): boolean {
		if (this.selectedRow?.role != 'AGENT') {
			return true;
		}
		return false;
	}

	viewAgent(row: UserDto): void {
		if (this.selectedRow != null) {
			this.dialog.open(ActuaryInfoDialogComponent, {
				data: { selectedRow: row },
			});
		}
	}

	addAgent() {
		const dialogRef = this.dialog.open(AddAgentDialogComponent, {
			autoFocus: false,
		});

		dialogRef.afterClosed().subscribe(() => {
			this.selectedRow = null;
			setTimeout(() => {
				this.fetchAllData();
			}, 1000);
		});
	}

	resetLeftOfLimit(): void {
		if (this.selectedRow != null && this.selectedRow.role == 'AGENT') {
			this.userService
				.patchResetAgentsLeftLimit(this.selectedRow.id)
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
}
