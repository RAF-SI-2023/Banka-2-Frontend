import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BankOtcStockDto } from 'src/app/dtos/bank-otc-stock-dto';
import { BankOtcService } from 'src/app/services/otc-service/bank-otc.service';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewInterbankOfferDialogComponent } from './dialogs/new-interbank-offer-dialog/new-interbank-offer-dialog.component';

@Component({
	selector: 'app-interbank-tradable-securities',
	templateUrl: './interbank-tradable-securities.component.html',
	styleUrls: ['./interbank-tradable-securities.component.css'],
})
export class InterbankTradableSecuritiesComponent implements AfterViewInit {
	displayedColumns: string[] = ['id', 'ticker', 'amount'];
	dataSource = new MatTableDataSource<BankOtcStockDto>();

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private bankOtcService: BankOtcService,
		public dialog: MatDialog,
	) {
		this.dataSource = new MatTableDataSource();
		this.fetchAllData();
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	ngAfterViewInit() {
		if (this.paginator) this.dataSource.paginator = this.paginator;
		if (this.sort) this.dataSource.sort = this.sort;
	}

	fetchAllData(): void {
		this.bankOtcService
			.getBanksStocks()
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

	openNewOfferDialog(row?: BankOtcStockDto): void {
		if (row) {
			console.log(row);
			const dialogRef = this.dialog.open(
				NewInterbankOfferDialogComponent,
				{
					data: { ticker: row.ticker, amount: row.amount }, // Pass ticker data to the dialog
					autoFocus: false,
				},
			);

			dialogRef.afterClosed().subscribe(result => {
				if (result) {
					// Handle the result if necessary
					this.fetchAllData();
				}
			});
		}
	}

	refreshOffers(): void {
		this.bankOtcService
			.putRefresh()
			.pipe(
				tap(() => {
					this.fetchAllData();
					console.log('Data refreshed successfully.');
				}),
				catchError(error => {
					console.error('Error refreshing data:', error);
					return of(null);
				}),
				finalize(() => {}),
			)
			.subscribe();
	}
}
