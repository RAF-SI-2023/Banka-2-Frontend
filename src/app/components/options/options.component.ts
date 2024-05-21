import { Component, OnInit, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OptionsDto } from 'src/app/dtos/options-dto';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OptionService } from 'src/app/services/stock-service/option.service';
import { ActivatedRoute } from '@angular/router';
import { OptionInfoDialogComponent } from './option-info-dialog/option-info-dialog.component';

@Component({
	selector: 'app-options',
	templateUrl: './options.component.html',
	styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements AfterViewInit, OnInit {
	dataSource = new MatTableDataSource<OptionsDto>();
	displayedColumnsCall: string[] = [
		'stockListing',
		'optionType',
		'strikePrice',
		'impliedVolatility',
		'openInterest',
		'settlementDate',
	];
	dataSourceCall = new MatTableDataSource<OptionsDto>();
	selectedRowCall: OptionsDto | null = null;

	displayedColumnsPut: string[] = [
		'stockListing',
		'optionType',
		'strikePrice',
		'impliedVolatility',
		'openInterest',
		'settlementDate',
	];
	dataSourcePut = new MatTableDataSource<OptionsDto>();
	selectedRowPut: OptionsDto | null = null;

	@ViewChild('CallMatPaginator') paginatorCall: MatPaginator | undefined;
	@ViewChild('CallMatSort') sortCall: MatSort | undefined;

	@ViewChild('PutMatPaginator') paginatorPut: MatPaginator | undefined;
	@ViewChild('PutMatSort') sortPut: MatSort | undefined;

	constructor(
		private optionService: OptionService,
		public dialog: MatDialog,
		private route: ActivatedRoute,
	) {
		this.dataSource = new MatTableDataSource();
		this.dataSourceCall = new MatTableDataSource();
		this.dataSourcePut = new MatTableDataSource();
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			const stockListing = params['stockListing'];
			if (stockListing) {
				this.fetchAllData(stockListing);
			}
		});
	}

	ngAfterViewInit() {
		if (this.paginatorCall)
			this.dataSourceCall.paginator = this.paginatorCall;
		if (this.sortCall) this.dataSourceCall.sort = this.sortCall;

		if (this.paginatorPut) this.dataSourcePut.paginator = this.paginatorPut;
		if (this.sortPut) this.dataSourcePut.sort = this.sortPut;
	}

	applyFilterCall(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSourceCall.filter = filterValue.trim().toLowerCase();

		if (this.dataSourceCall.paginator) {
			this.dataSourceCall.paginator.firstPage();
		}
	}

	applyFilterPut(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSourcePut.filter = filterValue.trim().toLowerCase();

		if (this.dataSourcePut.paginator) {
			this.dataSourcePut.paginator.firstPage();
		}
	}

	selectCallRow(row: OptionsDto): void {
		if (this.selectedRowCall?.strikePrice != row.strikePrice) {
			this.selectedRowCall = row;
		}
	}

	selectPutRow(row: OptionsDto): void {
		if (this.selectedRowPut?.strikePrice != row.strikePrice) {
			this.selectedRowPut = row;
		}
	}

	fetchAllData(stockListing: any): void {
		this.optionService
			.getFindAllOptionsByStockListing(stockListing)
			.pipe(
				map(dataSource => {
					this.dataSource.data = dataSource;
					this.dataSourceCall.data = dataSource.filter(
						item => item.optionType === 'CALL',
					);
					this.dataSourcePut.data = dataSource.filter(
						item => item.optionType === 'PUT',
					);
					return dataSource;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	viewOptionsCall(row: OptionsDto) {
		this.dialog.open(OptionInfoDialogComponent, {
			data: row,
			autoFocus: false,
		});
	}

	viewOptionsPut(row: OptionsDto) {
		this.dialog.open(OptionInfoDialogComponent, {
			data: row,
			autoFocus: false,
		});
	}
}
