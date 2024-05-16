import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TransactionDto } from 'src/app/dtos/transaction-dto';
import { TransactionService } from 'src/app/services/bank-service/transaction.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'transactions-all',
	templateUrl: 'transactions-all.component.html',
	styleUrls: ['./transactions-all.component.css'],
})
export class TransactionsAllComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'amount',
		'createdAt',
		'status',
		'type',
	];
	dataSource = new MatTableDataSource<TransactionDto>();
	selectedRow: TransactionDto | null = null;

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private transactionService: TransactionService,
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

	selectRow(row: TransactionDto): void {
		if (this.selectedRow?.id != row.id) {
			this.selectedRow = row;
		}
	}

	fetchAllData(): void {
		const id = Number(localStorage.getItem('id'));
		this.transactionService
			.getAllTransactions(id)
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
