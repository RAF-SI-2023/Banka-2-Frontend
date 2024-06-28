import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BankOtcStockDto } from 'src/app/dtos/bank-otc-stock-dto';
import { InterbankTradableSecuritiesService } from 'src/app/services/otc-service/interbank-tradable-securities.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
		private InterbankTradableSecuritiesService: InterbankTradableSecuritiesService,
	) {
		this.dataSource = new MatTableDataSource();
		this.fetchAllData();
	}

	ngAfterViewInit() {
		if (this.paginator) this.dataSource.paginator = this.paginator;
		if (this.sort) this.dataSource.sort = this.sort;
	}

	fetchAllData(): void {
		this.InterbankTradableSecuritiesService.getBanksStocks()
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
