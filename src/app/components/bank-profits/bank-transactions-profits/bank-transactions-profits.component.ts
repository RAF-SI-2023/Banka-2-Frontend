import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { BankTransferTransactionDetailsService } from 'src/app/services/bank-service/bank-transfer-transaction-details.service';
import { BankTransferTransactionDetailsDto } from 'src/app/dtos/bank-transfer-transaction-details-dto';

@Component({
	selector: 'app-bank-transactions-profits',
	templateUrl: './bank-transactions-profits.component.html',
	styleUrls: ['./bank-transactions-profits.component.css'],
})
export class BankTransactionsProfitsComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'fee',
		'boughtCurrency',
		'soldCurrency',
		'amount',
		'totalProfit',
	];
	dataSource = new MatTableDataSource<BankTransferTransactionDetailsDto>();
	selectedRow: BankTransferTransactionDetailsDto | null = null;

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private bankTransferTransactionDetailsService: BankTransferTransactionDetailsService,
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

	selectRow(row: BankTransferTransactionDetailsDto): void {
		if (this.selectedRow?.id != row.id) {
			this.selectedRow = row;
		}
	}

	fetchAllData(): void {
		this.bankTransferTransactionDetailsService
			.getAll()
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
