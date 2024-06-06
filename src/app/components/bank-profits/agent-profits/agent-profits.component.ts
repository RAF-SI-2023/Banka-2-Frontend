import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActionAgentProfitService } from 'src/app/services/bank-service/action-agent-profit.service';
import { ActionAgentProfitDto } from 'src/app/dtos/action-agent-profit-dto';

@Component({
	selector: 'app-agent-profits',
	templateUrl: './agent-profits.component.html',
	styleUrls: ['./agent-profits.component.css'],
})
export class AgentProfitsComponent implements AfterViewInit {
	displayedColumns: string[] = [
		'id',
		'userEmail',
		'profit',
		'transactionType',
		'transactionId',
		'createdAt',
	];
	dataSource = new MatTableDataSource<ActionAgentProfitDto>();
	selectedRow: ActionAgentProfitDto | null = null;

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	constructor(
		private actionAgentProfitService: ActionAgentProfitService,
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

	selectRow(row: ActionAgentProfitDto): void {
		if (this.selectedRow?.id != row.id) {
			this.selectedRow = row;
		}
	}

	fetchAllData(): void {
		this.actionAgentProfitService
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
