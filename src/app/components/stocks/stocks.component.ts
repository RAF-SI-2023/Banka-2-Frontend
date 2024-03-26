import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StockDto } from 'src/app/dtos/stock-dto';
import { StockService } from 'src/app/services/stock.service';
import { AuthService } from 'src/app/services/auth.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
	selector: 'stocks',
	templateUrl: 'stocks.component.html',
	styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'symbol',
		'description',
		'exchange',
		'lastRefresh',
		'price',
		'high',
		'low',
		'change',
		'volume',
		'shares',
		'yield',
	];
	dataSource = new MatTableDataSource<StockDto>();
	selectedRow: StockDto | null = null;

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private http: HttpClient,
		private authService: AuthService,
		private stockService: StockService,
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

	selectRow(row: StockDto): void {
		if (this.selectedRow?.symbol != row.symbol) {
			this.selectedRow = row;
		}
	}

	fetchAllData(): void {
		this.stockService
			.getFindAllStocks()
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
}
