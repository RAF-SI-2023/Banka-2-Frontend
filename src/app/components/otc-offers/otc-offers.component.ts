import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, map, startWith } from 'rxjs/operators';
import { forkJoin, Observable, throwError } from 'rxjs';
import { COMMA, ENTER, M } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
//import { ContractInfoDialogComponent } from './contract/contract-info-dialog/contract-info-dialog.component';
import { ContractDto } from 'src/app/dtos/contract-dto';
import { InterbankTradableSecuritiesService } from 'src/app/services/otc-service/interbank-tradable-securities.service';
import { MyOfferDto } from 'src/app/dtos/my-offer-dto';
import { OfferStatus } from 'src/app/dtos/my-offer-dto';
import { OfferDto } from 'src/app/dtos/offer-dto';

@Component({
	selector: 'app-otc-offers',
	templateUrl: './otc-offers.component.html',
	styleUrls: ['./otc-offers.component.css'],
})
export class OTCOfferComponent implements AfterViewInit {
	displayedColumns: string[] = [
		//'myOfferId',
		'offerId',
		'ticekr',
		'amount',
		'price',
		'idBank',
		'offerStatus',
	];
	dataSourceMyOffer = new MatTableDataSource<MyOfferDto>();
	dataSourceOffer = new MatTableDataSource<OfferDto>();
	dataSource = new MatTableDataSource<any>();
	//selectedRow: ContractDto | null = null;

	separatorKeysCodes: number[] = [ENTER, COMMA];
	statusCtrl = new FormControl('');
	filteredStatus: Observable<string[]>;
	statuses: string[] = [];
	allStatuses: string[] = ['Primljene Ponude', 'Naše Ponude'];

	@ViewChild('statusInput') statusInput:
		| ElementRef<HTMLInputElement>
		| undefined;
	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private offerService: InterbankTradableSecuritiesService,
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
		this.statuses.push('Primljene Ponude');
		this.fetchData();
	}

	/*selectRow(row: ContractDto): void {
		if (this.selectedRow?.id != row.id) {
			this.selectedRow = row;
		}
	}*/

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
			this.statuses.push('Primljene Ponude');
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
		if (this.statuses.at(0) == 'Naše Ponude') {
			this.displayedColumns = [
				'myOfferId',
				//'offerId',
				'ticekr',
				'amount',
				'price',
				'idBank',
				'offerStatus',
			];
			this.offerService
				.getOurOffers()
				.pipe(
					map(dataSourceMyOffer => {
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
				//'myOfferId',
				'offerId',
				'ticekr',
				'amount',
				'price',
				'idBank',
				'offerStatus',
			];
			this.offerService
				.getOffers()
				.pipe(
					map(dataSourceOffer => {
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

	protected readonly OfferStatus = OfferStatus;
}
