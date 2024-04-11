import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StockService } from 'src/app/services/stock-service/stock.service';
import { AuthService } from 'src/app/services/iam-service/auth.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FuturesContractDto } from 'src/app/dtos/futures-contract-dto';
import { FuturesContractService } from 'src/app/services/stock-service/futures-contract.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-futures-contracts',
	templateUrl: './futures-contracts.component.html',
	styleUrls: ['./futures-contracts.component.css'],
})
export class FuturesContractsComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'name',
		'code',
		'contractSize',
		'contractUnit',
		'openInterest',
		'settlementDate',
		'maintenanceMargin',
		'type',
	];
	dataSource = new MatTableDataSource<FuturesContractDto>();
	selectedRow: FuturesContractDto | null = null;

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private http: HttpClient,
		private authService: AuthService,
		private stockService: StockService,
		private futuresContractService: FuturesContractService,
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

	selectRow(row: FuturesContractDto): void {
		if (this.selectedRow?.id != row.id) {
			this.selectedRow = row;
		}
	}

	fetchAllData(): void {
		this.futuresContractService
			.getFindAllFutures()
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

	viewFuturesContract(row: FuturesContractDto): void {
		if (this.selectedRow != null) {
			// const dialogRef = this.dialog.open(FuturesContractInfoDialogComponent, {
			// 	data: { selectedRow: row },
			// 	autoFocus: false,
			// });
		}
	}
}
