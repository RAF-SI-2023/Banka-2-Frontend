import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/iam-service/auth.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CurrencyDto } from '../../dtos/currency-dto';
import { CurrencyService } from '../../services/stock-service/currency.service';
import { ExchangeService } from '../../services/stock-service/exchange.service';
import { ExchangeDto } from '../../dtos/exchange-dto';
import { CurrencyInfoDialogComponent } from './dialogs/currency-info-dialog/currency-info-dialog.component';
import { ExchangeInfoDialogComponent } from './dialogs/exchange-info-dialog/exchange-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'currency-exchange',
	templateUrl: 'currency-exchange.component.html',
	styleUrls: ['./currency-exchange.component.css'],
})
export class CurrencyExchangeComponent implements AfterViewInit {
	currencyDisplayedColumns: string[] = [
		'currencyName',
		'currencyCode',
		'currencySymbol', // Ovo je u stvari politicki entitet
	];
	currencyDataSource = new MatTableDataSource<CurrencyDto>();
	currencySelectedRow: CurrencyDto | null = null;

	exchangeDisplayedColumns: string[] = [
		'exchangeName',
		'exchangeAcronym',
		'exchangeMICode',
		'polity',
		'currency',
		'timeZone',
	];
	exchangeDataSource = new MatTableDataSource<ExchangeDto>();
	exchangeSelectedRow: ExchangeDto | null = null;

	@ViewChild('CurrencyMatPaginator') currencyPaginator:
		| MatPaginator
		| undefined;
	@ViewChild('CurrencyMatSort') currencySort: MatSort | undefined;

	@ViewChild('ExchangeMatPaginator') exchangePaginator:
		| MatPaginator
		| undefined;
	@ViewChild('ExchangeMatSort') exchangeSort: MatSort | undefined;

	constructor(
		private http: HttpClient,
		private authService: AuthService,
		private currencyService: CurrencyService,
		private exchangeService: ExchangeService,
		public dialog: MatDialog,
	) {
		this.currencyDataSource = new MatTableDataSource();
		this.exchangeDataSource = new MatTableDataSource();
		this.fetchAllData();
	}

	ngAfterViewInit() {
		if (this.currencyPaginator)
			this.currencyDataSource.paginator = this.currencyPaginator;
		if (this.currencySort) this.currencyDataSource.sort = this.currencySort;

		if (this.exchangePaginator)
			this.exchangeDataSource.paginator = this.exchangePaginator;
		if (this.exchangeSort) this.exchangeDataSource.sort = this.exchangeSort;
	}

	applyFilterForCurrency(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.currencyDataSource.filter = filterValue.trim().toLowerCase();

		if (this.currencyDataSource.paginator) {
			this.currencyDataSource.paginator.firstPage();
		}
	}

	applyFilterForExchange(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.exchangeDataSource.filter = filterValue.trim().toLowerCase();

		if (this.exchangeDataSource.paginator) {
			this.exchangeDataSource.paginator.firstPage();
		}
	}

	selectCurrencyRow(row: CurrencyDto): void {
		if (this.currencySelectedRow?.currencySymbol != row.currencySymbol) {
			this.currencySelectedRow = row;
		}
	}

	selectExchangeRow(row: ExchangeDto): void {
		if (this.exchangeSelectedRow?.exchangeMICode != row.exchangeMICode) {
			this.exchangeSelectedRow = row;
		}
	}

	fetchAllData(): void {
		this.currencyService
			.getFindAll()
			.pipe(
				map(currencyDataSource => {
					this.currencyDataSource.data = currencyDataSource;
					return currencyDataSource;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();

		this.exchangeService
			.getFindAll()
			.pipe(
				map(currencyDataSource => {
					this.exchangeDataSource.data = currencyDataSource;
					return currencyDataSource;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	viewCurrency(row: CurrencyDto): void {
		if (this.currencySelectedRow != null) {
			this.dialog.open(CurrencyInfoDialogComponent, {
				data: { selectedRow: row },
				autoFocus: false,
			});
		}
	}
	viewExchange(row: ExchangeDto): void {
		if (this.exchangeSelectedRow != null) {
			this.dialog.open(ExchangeInfoDialogComponent, {
				data: { selectedRow: row },
				autoFocus: false,
			});
		}
	}
}
