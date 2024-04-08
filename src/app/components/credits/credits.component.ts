import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CreditDto} from "../../dtos/credit-dto";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CreditService} from "../../services/credit.service";
import {CreditInfoDialogComponent} from "./dialogs/credit-info-dialog/credit-info-dialog.component";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements AfterViewInit{
	displayedColumns: string[] = [
		'creditName',
		'creditNumber',
		'creditAmount'
	];
	dataSource = new MatTableDataSource<CreditDto>();
	selectedRow: CreditDto | null = null;

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private creditService: CreditService,
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

	selectRow(row: CreditDto): void {
		if (this.selectedRow?.creditNumber != row.creditNumber) {
			this.selectedRow = row;
		}
	}

	viewCredit(row: CreditDto){
		if (this.selectedRow != null) {
			const dialogRef = this.dialog.open(CreditInfoDialogComponent, {
				data: { selectedRow: row },
			});
		}
	}

	fetchAllData(): void {
		this.creditService
			.getFindAll()
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
