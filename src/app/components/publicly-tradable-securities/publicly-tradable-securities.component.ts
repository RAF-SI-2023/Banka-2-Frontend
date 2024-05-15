import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ForexDto } from '../../dtos/forex-dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/iam-service/auth.service';
import { StockService } from '../../services/stock-service/stock.service';
import { ForexService } from '../../services/stock-service/forex.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ForexInfoDialogComponent } from '../forex/forex-info-dialog/forex-info-dialog.component';
import {
	PubliclyTradableSecuritiesInfoDialogComponent
} from './publicly-tradable-securities-info-dialog/publicly-tradable-securities-info-dialog.component';

@Component({
  selector: 'app-publicly-tradable-securities',
  templateUrl: './publicly-tradable-securities.component.html',
  styleUrls: ['./publicly-tradable-securities.component.css']
})
export class PubliclyTradableSecuritiesComponent implements AfterViewInit {
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
			this.dialog.open(PubliclyTradableSecuritiesInfoDialogComponent, {
				data: { selectedRow: row },
				autoFocus: false,
			});
		}
	}



}
