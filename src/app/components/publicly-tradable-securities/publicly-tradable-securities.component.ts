import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SecurityDto } from 'src/app/dtos/security-dto';
import { SecuritiesService } from 'src/app/services/bank-service/securities.service';
import { PublicSecurityInfoDialogComponent } from './public-security-info-dialog/public-security-info-dialog.component';

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
		private http: HttpClient,
		private securitiesService: SecuritiesService,
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

	fetchAllData(): void {
		this.securitiesService
			.getAllPublicSecurities()
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

	viewSecurity(row: SecurityDto): void {
		this.dialog.open(PublicSecurityInfoDialogComponent, {
			data: row,
			autoFocus: false,
		});
	}
}
