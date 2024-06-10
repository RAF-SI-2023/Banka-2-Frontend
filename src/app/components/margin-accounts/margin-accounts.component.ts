import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, throwError } from 'rxjs';
import { MarginAccountDto } from 'src/app/dtos/margin-account-dto';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { MarginAccountsService } from 'src/app/services/bank-service/margin-accounts.service';
import { DropdownOption, DropdownOptions } from 'src/app/utils/constants';
import { AddMarginAccountDialogComponent } from './dialogs/add-margin-account-dialog/add-margin-account-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditMarginAccountDialogComponent } from './dialogs/edit-margin-account-dialog/edit-margin-account-dialog.component';
import { MarginAccountInfoDialogComponent } from './dialogs/margin-account-info-dialog/margin-account-info-dialog.component';

@Component({
	selector: 'app-margin-accounts',
	templateUrl: './margin-accounts.component.html',
	styleUrls: ['./margin-accounts.component.css'],
})
export class MarginAccountsComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'userId',
		'email',
		'currencyCode',
		'accountNumber',
		'type',
		'balance',
		'loanValue',
		'maintenanceMargin',
		// 'marginCall',
	];

	dataSource: MatTableDataSource<MarginAccountDto>;
	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;
	protected readonly validateHorizontalPosition = validateHorizontalPosition;

	selectedRow: MarginAccountDto | null = null;

	foreignCurrencyOptions: DropdownOption[] = DropdownOptions.currencyCodes;

	constructor(
		private marginAccountService: MarginAccountsService,
		public dialog: MatDialog,
	) {
		this.dataSource = new MatTableDataSource();
		this.fetchAllData();
	}
	ngAfterViewInit() {
		if (this.paginator) this.dataSource.paginator = this.paginator;
		if (this.sort) this.dataSource.sort = this.sort;
	}
	fetchAllData() {
		const email = localStorage.getItem('email');
		if (email != null)
			this.marginAccountService
				.getAllByEmail(email)
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

	selectRow(row: MarginAccountDto) {
		if (this.selectedRow?.id != row.id) {
			this.selectedRow = row;
		}
	}

	addMarginAccount() {
		const dialogRef = this.dialog.open(AddMarginAccountDialogComponent, {
			autoFocus: false,
		});

		dialogRef.afterClosed().subscribe(() => {
			this.selectedRow = null;
			setTimeout(() => {
				this.fetchAllData();
			}, 1000);
		});
	}

	editMarginAccount() {
		if (this.selectedRow != null) {
			const dialogRef = this.dialog.open(
				EditMarginAccountDialogComponent,
				{
					data: { selectedRow: this.selectedRow },
					autoFocus: false,
				},
			);

			dialogRef.afterClosed().subscribe(() => {
				this.selectedRow = null;
				setTimeout(() => {
					this.fetchAllData();
				}, 1000);
			});
		}
	}

	deleteMarginAccount() {
		if (this.selectedRow != null) {
			this.marginAccountService
				.deleteMarginsAccount(this.selectedRow.id)
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

	viewAccount(row: MarginAccountDto) {
		if (this.selectedRow != null) {
			this.dialog.open(MarginAccountInfoDialogComponent, {
				data: { selectedRow: row },
				autoFocus: false,
			});
		}
	}
}
