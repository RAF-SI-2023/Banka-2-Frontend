import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDto, OrderStatus } from '../../dtos/order-dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrderService } from '../../services/bank-service/order.service';
import { catchError, map, startWith } from 'rxjs/operators';
import { forkJoin, Observable, throwError } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { OrderInfoDialogComponent } from './order-info-dialog/order-info-dialog.component';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'orderActionType',
		'listingType',
		'securitiesSymbol',
		'quantity',
		'settlementDate',
		'limitPrice',
		'stopPrice',
		'orderStatus',
	];
	dataSource = new MatTableDataSource<OrderDto>();
	selectedRow: OrderDto | null = null;

	separatorKeysCodes: number[] = [ENTER, COMMA];
	statusCtrl = new FormControl('');
	filteredStatus: Observable<string[]>;
	statuses: string[] = [];
	allStatuses: string[] = ['Odobreno', 'Na čekanju'];
	// allStatuses: string[] = ['Odobreno', 'Odbijeno', 'Na čekanju'];

	@ViewChild('statusInput') statusInput:
		| ElementRef<HTMLInputElement>
		| undefined;
	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private orderService: OrderService,
		public dialog: MatDialog,
	) {
		this.filteredStatus = this.statusCtrl.valueChanges.pipe(
			startWith(null),
			map((fruit: string | null) =>
				fruit ? this._filter(fruit) : this.allStatuses.slice(),
			),
		);
		this.dataSource = new MatTableDataSource();
		this.fetchAllData();
	}

	selectRow(row: OrderDto): void {
		// if (this.selectedRow?.id != row.id) {
		// 	this.selectedRow = row;
		// }
		this.selectedRow = row;
	}

	viewOrder(row: OrderDto): void {
		if (this.selectedRow != null) {
			const dialogRef = this.dialog.open(OrderInfoDialogComponent, {
				data: { selectedRow: row },
				autoFocus: false,
			});

			dialogRef.afterClosed().subscribe(() => {
				this.selectedRow = null;
				setTimeout(() => {
					this.fetchFilteredData();
				}, 1000);
			});
		}
	}

	add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		// Add the status
		if (value && this.statuses.indexOf(value) === -1) {
			this.statuses.push(value);
		}

		// Clear the input value
		event.chipInput!.clear();

		this.statusCtrl.setValue(null);
	}

	remove(status: string): void {
		const index = this.statuses.indexOf(status);

		if (index >= 0) {
			this.statuses.splice(index, 1);
			this.statusCtrl.setValue(null); // Trigger the valueChanges to update the filtered options
		}

		this.fetchFilteredData();

		if (this.statuses.length === 0) {
			this.fetchAllData();
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		const value = event.option.viewValue;
		if (this.statuses.indexOf(value) === -1) {
			this.statuses.push(value);
		}
		this.statusInput!.nativeElement.value = '';
		this.statusCtrl.setValue(null);

		this.fetchFilteredData();
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.allStatuses.filter(
			status =>
				status.toLowerCase().includes(filterValue) &&
				this.statuses.indexOf(status) === -1,
		);
	}
	ngAfterViewInit() {
		if (this.paginator) this.dataSource.paginator = this.paginator;
		if (this.sort) this.dataSource.sort = this.sort;
	}

	fetchAllData() {
		this.orderService
			.getAllOrders()
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

	fetchFilteredData() {
		// Call all the necessary API endpoints to get the data
		// and then combine the results into a single array
		const apiCalls: Observable<OrderDto[]>[] = [];

		if (this.statuses.includes('Odobreno')) {
			apiCalls.push(this.orderService.getApprovedOrders());
		}
		if (this.statuses.includes('Na čekanju')) {
			apiCalls.push(this.orderService.getNonApprovedOrders());
		}

		//! Add if statement for 'Odbijeno' status when needed

		// If there are no statuses selected, fetch all data
		if (apiCalls.length > 0) {
			forkJoin(apiCalls)
				.pipe(
					map(results => {
						const combinedResults: OrderDto[] = [];
						results.forEach(result =>
							combinedResults.push(...result),
						);
						this.dataSource.data = combinedResults;
					}),
					catchError(error => {
						console.error('Error loading filtered data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe();
		} else {
			this.fetchAllData();
		}
	}

	protected readonly OrderStatus = OrderStatus;
}
