import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, map, startWith } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { BankOtcService } from 'src/app/services/otc-service/bank-otc.service';
import { MyOfferDto } from 'src/app/dtos/my-offer-dto';
import { OfferStatus } from 'src/app/dtos/my-offer-dto';
import { OfferDto } from 'src/app/dtos/offer-dto';

@Component({
	selector: 'app-interbank-securities-offers',
	templateUrl: './interbank-securities-offers.component.html',
	styleUrls: ['./interbank-securities-offers.component.css'],
})
export class InterbankSecuritiesOffersComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'myOfferId',
		'ticker',
		'amount',
		'price',
		'offerStatus',
	];
	dataSourceMyOffer = new MatTableDataSource<MyOfferDto>();
	dataSourceOffer = new MatTableDataSource<OfferDto>();
	dataSource = new MatTableDataSource<any>();

	separatorKeysCodes: number[] = [ENTER, COMMA];
	statusCtrl = new FormControl('');
	filteredStatus: Observable<string[]>;
	statuses: string[] = [];
	allStatuses: string[] = ['Primljene ponude', 'Poslate ponude'];

	@ViewChild('statusInput') statusInput:
		| ElementRef<HTMLInputElement>
		| undefined;
	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;
	selectedRow: any;

	constructor(
		private bankOtcService: BankOtcService,
		public dialog: MatDialog,
	) {
		this.filteredStatus = this.statusCtrl.valueChanges.pipe(
			startWith(null),
			map((status: string | null) =>
				status ? this._filter(status) : this.allStatuses.slice(),
			),
		);
		this.dataSourceMyOffer = new MatTableDataSource();
		this.dataSourceOffer = new MatTableDataSource();
		this.statuses.push('Primljene ponude');
		this.fetchData();
	}

	selectRow(row: OfferDto | MyOfferDto): void {
		this.selectedRow = row;
	}

	isSelected(row: any): boolean {
		if (row?.offerId) {
			return this.selectedRow?.offerId === row.offerId;
		}
		if (row?.myOfferId) {
			return this.selectedRow?.myOfferId === row.myOfferId;
		}
		return false;
	}

	deleteOffer(): void {
		if (this.selectedRow?.offerId) {
			this.bankOtcService
				.deleteOffer(this.selectedRow.offerId)
				.pipe(map(() => this.fetchData()))
				.subscribe();
		}
		if (this.selectedRow?.myOfferId) {
			this.bankOtcService
				.deleteMyOffer(this.selectedRow.myOfferId)
				.pipe(map(() => this.fetchData()))
				.subscribe();
		}
	}

	add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		// Add the status
		if (value && this.statuses.indexOf(value) === -1) {
			this.statuses.push(value);
		}

		// Clear the input value
		if (event.chipInput) {
			event.chipInput.clear();
		}

		this.statusCtrl.setValue(null);
	}

	remove(status: string): void {
		const index = this.statuses.indexOf(status);

		if (index >= 0) {
			this.statuses.splice(index, 1);
			this.statusCtrl.setValue(null); // Trigger the valueChanges to update the filtered options
		}

		this.fetchData();

		if (this.statuses.length === 0) {
			this.statuses.push('Primljene ponude');
			this.fetchData();
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		const value = event.option.viewValue;
		if (this.statuses.indexOf(value) === -1) {
			this.statuses.pop();
			this.statuses.push(value);
		}
		if (this.statusInput) {
			this.statusInput.nativeElement.value = '';
		}
		this.statusCtrl.setValue(null);

		this.fetchData();
	}

	private _filter(value: string): string[] {
		this.selectedRow = null;
		const filterValue = value.toLowerCase();
		return this.allStatuses.filter(
			status =>
				status.toLowerCase().includes(filterValue) &&
				this.statuses.indexOf(status) === -1,
		);
	}

	ngAfterViewInit() {
		if (this.paginator) this.dataSourceOffer.paginator = this.paginator;
		if (this.sort) this.dataSourceOffer.sort = this.sort;
	}

	fetchData() {
		if (this.statuses.at(0) == 'Poslate ponude') {
			this.displayedColumns = [
				'myOfferId',
				'ticker',
				'amount',
				'price',
				'offerStatus',
			];
			this.bankOtcService
				.getOurOffers()
				.pipe(
					map(dataSourceMyOffer => {
						console.log(`got ${dataSourceMyOffer.length} offers`);
						this.dataSourceMyOffer.data = dataSourceMyOffer;
						this.dataSource = this.dataSourceMyOffer;
						return dataSourceMyOffer;
					}),
					catchError(error => {
						console.error('Error loading data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe();
		} else {
			this.displayedColumns = [
				'offerId',
				'ticker',
				'amount',
				'price',
				'offerStatus',
			];
			this.bankOtcService
				.getOffers()
				.pipe(
					map(dataSourceOffer => {
						console.log(`got ${dataSourceOffer.length} offers`);

						this.dataSourceOffer.data = dataSourceOffer;
						this.dataSource = this.dataSourceOffer;
						return dataSourceOffer;
					}),
					catchError(error => {
						console.error('Error loading data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe();
		}
	}

	isDisabled(): boolean {
		return !this.selectedRow;
	}

	protected readonly OfferStatus = OfferStatus;
}
