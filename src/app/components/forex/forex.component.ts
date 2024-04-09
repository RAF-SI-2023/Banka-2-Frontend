import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ForexDto } from 'src/app/dtos/forex-dto';
import { StockService } from 'src/app/services/stock-service/stock.service';
import { ForexService } from 'src/app/services/stock-service/forex.service';
import { AuthService } from 'src/app/services/iam-service/auth.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ForexInfoDialogComponent } from './forex-info-dialog/forex-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-forex',
	templateUrl: './forex.component.html',
	styleUrls: ['./forex.component.css'],
})
export class ForexComponent implements AfterViewInit {
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
		'baseCurrency',
		'quoteCurrency',
	];
	dataSource = new MatTableDataSource<ForexDto>();
	selectedRow: ForexDto | null = null;

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private http: HttpClient,
		private authService: AuthService,
		private stockService: StockService,
		private forexService: ForexService,
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

	selectRow(row: ForexDto): void {
		if (this.selectedRow?.symbol != row.symbol) {
			this.selectedRow = row;
		}
	}

	fetchAllData(): void {
		this.forexService
			.getFindAllForex()
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

	viewForex(row: ForexDto): void {
		if (this.selectedRow != null) {
			const dialogRef = this.dialog.open(ForexInfoDialogComponent, {
				data: { selectedRow: row },
			});
		}
	}
}
