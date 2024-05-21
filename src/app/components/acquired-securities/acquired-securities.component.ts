import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';

import { SecurityDto } from 'src/app/dtos/security-dto';
import { SecuritiesService } from 'src/app/services/bank-service/securities.service';
import { AcquiredSecuritiesInfoDialogComponent } from './acquired-securities-info-dialog/acquired-securities-info-dialog.component';
import { AccountService } from 'src/app/services/bank-service/account.service';
import { AccountDto } from 'src/app/dtos/account-dto';

@Component({
	selector: 'app-acquired-securities',
	templateUrl: './acquired-securities.component.html',
	styleUrls: ['./acquired-securities.component.css'],
})
export class AcquiredSecuritiesComponent implements OnInit, AfterViewInit {
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
	accounts: AccountDto[] = [];
	accountNumber = new FormControl();

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private accountService: AccountService,
		private securitiesService: SecuritiesService,
		public dialog: MatDialog,
	) {
		this.dataSource = new MatTableDataSource();
	}

	ngOnInit(): void {
		this.getAccounts();
	}

	ngAfterViewInit() {
		if (this.paginator) this.dataSource.paginator = this.paginator;
		if (this.sort) this.dataSource.sort = this.sort;
	}

	applyFilter(event: MatSelectChange | string) {
		const accountNumber = typeof event === 'string' ? event : event.value;
		this.getAllSecuritiesByAccountNumber(accountNumber);
	}

	selectRow(row: SecurityDto): void {
		if (this.selectedRow?.securitiesSymbol != row.securitiesSymbol) {
			this.selectedRow = row;
		}
	}

	getAllSecuritiesByAccountNumber(accountNumber: string): void {
		this.securitiesService
			.getAllSecuritiesByAccountNumber(accountNumber)
			.pipe(
				map(securities => {
					this.dataSource.data = securities;
					return securities;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	viewSecurity(row: SecurityDto): void {
		const dialogRef = this.dialog.open(
			AcquiredSecuritiesInfoDialogComponent,
			{
				data: row,
				autoFocus: false,
			},
		);
		this.afterClose(dialogRef, row.accountNumber);
	}

	afterClose(dialogRef: any, accountNumber: string) {
		dialogRef.afterClosed().subscribe(() => {
			this.accountNumber.setValue(accountNumber);
			this.getAllSecuritiesByAccountNumber(accountNumber);
		});
	}

	getAccounts() {
		const emailLocal = localStorage.getItem('email');
		if (!emailLocal) return;

		this.accountService
			.getFindByEmail(emailLocal)
			.pipe(
				map(response => {
					this.accounts = response;
					if (this.accounts.length > 0) {
						this.accountNumber.setValue(this.accounts[0].accountNumber);
						this.getAllSecuritiesByAccountNumber(this.accounts[0].accountNumber);
					}
					return response;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}
}
