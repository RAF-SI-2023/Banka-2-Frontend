import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StockService } from 'src/app/services/stock.service';
import { AuthService } from 'src/app/services/auth.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {CurrencyDto} from "../../dtos/currency-dto";
import {CurrencyService} from "../../services/currency.service";
import {ExchangeService} from "../../services/exchange.service";
import {ExchangeDto} from "../../dtos/exchange-dto";

@Component({
	selector: 'currency-exchange',
	templateUrl: 'currency-exchange.component.html',
	styleUrls: ['./currency-exchange.component.css'],
})
export class CurrencyExchangeComponent implements AfterViewInit {
	currencyDisplayedColumns: string[] = [
		'currencyName',
		'currencyCode',
		'currencySymbol',
		'currencyPolity',
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


	@ViewChild('CurrencyMatPaginator') currencyPaginator: MatPaginator | undefined;
	@ViewChild('CurrencyMatSort') currencySort: MatSort | undefined;

	@ViewChild('ExchangeMatPaginator') exchangePaginator: MatPaginator | undefined;
	@ViewChild('ExchangeMatSort') exchangeSort: MatSort | undefined;

	constructor(
		private http: HttpClient,
		private authService: AuthService,
		private currencyService: CurrencyService,
		private exchangeService: ExchangeService,
	) {
		this.currencyDataSource = new MatTableDataSource();
		this.exchangeDataSource = new MatTableDataSource();
		this.fetchAllData();
	}

	ngAfterViewInit() {
		if (this.currencyPaginator) this.currencyDataSource.paginator = this.currencyPaginator;
		if (this.currencySort) this.currencyDataSource.sort = this.currencySort;
		if (this.exchangePaginator) this.exchangeDataSource.paginator = this.exchangePaginator;
		if (this.exchangeSort) this.exchangeDataSource.sort = this.exchangeSort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.currencyDataSource.filter = filterValue.trim().toLowerCase();

		if (this.currencyDataSource.paginator) {
			this.currencyDataSource.paginator.firstPage();
		}
	}

	selectRow(row: CurrencyDto): void {
		if (this.currencySelectedRow?.currencyCode != row.currencyCode) {
			this.currencySelectedRow = row;
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
}
