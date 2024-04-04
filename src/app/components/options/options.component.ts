import { Component, OnInit, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OptionsDto } from 'src/app/dtos/Options-dto';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StockService } from 'src/app/services/stock.service';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

@Component({
	selector: 'app-options',
	templateUrl: './options.component.html',
	styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements AfterViewInit, OnInit {
	displayedColumns: string[] = [
		'stockListing',
		'optionType',
		'strikePrice',
		'impliedVolatility',
		'openInterest',
		'settlementDate',
	];
	dataSource = new MatTableDataSource<OptionsDto>();
	selectedRow: OptionsDto | null = null;

	
	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;
	
	constructor(
		private stockService: StockService,
		public dialog: MatDialog,
        private route: ActivatedRoute // Inject ActivatedRoute

	) {
		this.dataSource = new MatTableDataSource();

	}
    ngOnInit() {
        this.route.params.subscribe(params => {
            const stockListing = params['stockListing'];
            if (stockListing) {
                this.fetchAllData(stockListing); // Fetch data based on stockListing parameter
            }
        });
    }
	findOptionById(rowData: any) {
		console.log('Double clicked row data:', rowData);
	}

	Filterchange(data: Event) {
		const value = (data.target as HTMLInputElement).value;
		this.dataSource.filter = value;
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

	selectRow(row: OptionsDto): void {
		if (this.selectedRow?.stockListing != row.stockListing) {
			this.selectedRow = row;
		}
	}
	viewOptions(row: OptionsDto): void {
		// if (this.selectedRow != null) {
		// 	const dialogRef = this.dialog.open(OptionsInfoDialogComponent, {
		// 		data: { selectedRow: row },
		// 	});
		// }
	}
	fetchAllData(stockListing: any): void {
		this.stockService
			.getFindAllOptionsByStockListing(stockListing)
			.pipe(
				map(dataSource => {
					console.log(dataSource);
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
