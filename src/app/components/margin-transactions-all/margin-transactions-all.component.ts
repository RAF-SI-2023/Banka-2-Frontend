import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MarginTransactionResponseDto } from 'src/app/dtos/margin-transaction-response-dto';
import { MarginTransactionService } from 'src/app/services/bank-service/margin-transaction.service';

@Component({
	selector: 'app-margin-transactions-all',
	templateUrl: './margin-transactions-all.component.html',
	styleUrls: ['./margin-transactions-all.component.css'],
})
export class MarginTransactionsAllComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'orderId',
		'userId',
		'marginsAccountId',
		'createdAt',
		'accountNumber',
		'description',
		'currencyCode',
		'type',
		'loanValue',
		'initialMargin',
		'maintenanceMargin',
	];
	dataSource = new MatTableDataSource<MarginTransactionResponseDto>();
	selectedRow: MarginTransactionResponseDto | null = null;

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private marginTransactionService: MarginTransactionService,
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

	selectRow(row: MarginTransactionResponseDto): void {
		if (this.selectedRow?.id != row.id) {
			this.selectedRow = row;
		}
	}

	fetchAllData(): void {
		this.marginTransactionService
			.getAllMarginsTransactionByEmail(
				localStorage.getItem('email') || '',
			)
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
