import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrderTransactionDto } from 'src/app/dtos/order-transaction-dto';
import { OrderTransactionService } from 'src/app/services/bank-service/order-transaction.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-order-transactions-all',
	templateUrl: './order-transactions-all.component.html',
	styleUrls: ['./order-transactions-all.component.css'],
})
export class OrderTransactionsAllComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'accountNumber',
		'date',
		'orderId',
		'currency',
		'payAmount',
		'payoffAmount',
		'reservedFunds',
		'usedOfReservedFunds',
	];
	dataSource = new MatTableDataSource<OrderTransactionDto>();
	selectedRow: OrderTransactionDto | null = null;

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private orderTransactionService: OrderTransactionService,
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

	selectRow(row: OrderTransactionDto): void {
		if (this.selectedRow?.id != row.id) {
			this.selectedRow = row;
		}
	}

	fetchAllData(): void {
		this.orderTransactionService
			.findAll()
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
