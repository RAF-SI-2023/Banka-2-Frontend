import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SecurityDto } from 'src/app/dtos/security-dto';
import { SecuritiesService } from 'src/app/services/bank-service/securities.service';
import { PublicSecurityInfoDialogComponent } from './public-security-info-dialog/public-security-info-dialog.component';
import { UserService } from 'src/app/services/iam-service/user.service';

@Component({
	selector: 'app-publicly-tradable-securities',
	templateUrl: './publicly-tradable-securities.component.html',
	styleUrls: ['./publicly-tradable-securities.component.css'],
})
export class PubliclyTradableSecuritiesComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'email',
		'ownedByBank',
		'accountNumber',
		'securitiesSymbol',
		'quantity',
		'quantityOfPubliclyAvailable',
		'reservedQuantity',
	];
	dataSource = new MatTableDataSource<SecurityDto>();
	selectedRow: SecurityDto | null = null;

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private securitiesService: SecuritiesService,
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

	selectRow(row: SecurityDto): void {
		if (this.selectedRow?.securitiesSymbol != row.securitiesSymbol) {
			this.selectedRow = row;
		}
	}

	private hasPib(response: any): response is { pib: string } {
		return (response as { pib: string }).pib !== undefined;
	}

	fetchAllData(): void {
		const idString: string | null = localStorage.getItem('id');

		if (idString !== null) {
			const id = Number(idString);
			if (!isNaN(id)) {
				this.userService
					.getFindById(id)
					.pipe(
						switchMap(response => {
							if (
								this.hasPib(response) ||
								response.role === 'AGENT' ||
								response.role === 'SUPERVISOR'
							) {
								return this.securitiesService
									.getAllCompanyOwnedSecurities()
									.pipe(
										map(dataSource => {
											this.dataSource.data = dataSource;
											return dataSource;
										}),
										catchError(error => {
											console.error(
												'Error loading data.',
												error,
											);
											return throwError(() => error);
										}),
									);
							} else if (response.role === 'ADMIN') {
								return this.securitiesService
									.getAllOwnedSecurities()
									.pipe(
										map(dataSource => {
											this.dataSource.data = dataSource;
											return dataSource;
										}),
										catchError(error => {
											console.error(
												'Error loading data.',
												error,
											);
											return throwError(() => error);
										}),
									);
							} else {
								console.log(response);
								return this.securitiesService
									.getAllPrivatelyOwnedSecurities()
									.pipe(
										map(dataSource => {
											this.dataSource.data = dataSource;
											return dataSource;
										}),
										catchError(error => {
											console.error(
												'Error loading data.',
												error,
											);
											return throwError(() => error);
										}),
									);
							}
						}),
						catchError(error => {
							console.error('Error fetching user data.', error);
							return of(null); // Handle the error and provide a fallback value if necessary
						}),
					)
					.subscribe();
			} else {
				console.error('Invalid id in localStorage');
			}
		} else {
			console.error('No id found in localStorage');
		}
	}

	viewSecurity(row: SecurityDto): void {
		this.dialog.open(PublicSecurityInfoDialogComponent, {
			data: row,
			autoFocus: false,
		});
	}
}
