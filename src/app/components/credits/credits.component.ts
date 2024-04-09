import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CreditDto } from '../../dtos/credit-dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreditService } from '../../services/credit.service';
import { CreditInfoDialogComponent } from './dialogs/credit-info-dialog/credit-info-dialog.component';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BankService } from '../../services/bank.service';
import { AuthService } from '../../services/auth.service';
import { AccountDto } from '../../dtos/account-dto';

@Component({
	selector: 'app-credits',
	templateUrl: './credits.component.html',
	styleUrls: ['./credits.component.css'],
})
export class CreditsComponent implements AfterViewInit {
	displayedColumns: string[] = ['creditName', 'creditNumber', 'creditAmount'];
	displayedAccountColumns: string[] = [
		'accountType',
		'accountNumber',
		'availableBalance',
	];
	dataSource = new MatTableDataSource<CreditDto>();
	accountNumberDataSource = new MatTableDataSource<AccountDto>();
	selectedAccount: AccountDto | null = null;
	selectedCredit: CreditDto | null = null;

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;
	@ViewChild(MatPaginator) accountNumberPaginator: MatPaginator | undefined;
	@ViewChild(MatSort) accountNumberSort: MatSort | undefined;

	constructor(
		private creditService: CreditService,
		public dialog: MatDialog,
		private router: Router,
		private bankService: BankService,
		private authService: AuthService,
	) {
		this.dataSource = new MatTableDataSource();
		this.accountNumberDataSource = new MatTableDataSource();
		this.fetchAccounts();
	}

	ngAfterViewInit() {
		if (this.paginator) this.dataSource.paginator = this.paginator;
		if (this.sort) this.dataSource.sort = this.sort;
		if (this.accountNumberPaginator)
			this.accountNumberDataSource.paginator =
				this.accountNumberPaginator;
		if (this.accountNumberSort)
			this.accountNumberDataSource.sort = this.accountNumberSort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	redirectToCreateRequest(): void {
		this.router.navigate(['credits/create-credit-request']);
	}

	selectRow(row: CreditDto): void {
		if (this.selectedCredit?.creditNumber != row.creditNumber) {
			this.selectedCredit = row;
		}
	}

	selectAccountRow(row: AccountDto): void {
		if (this.selectedAccount?.accountNumber != row.accountNumber) {
			this.selectedAccount = row;
			this.fetchAllData();
		}
	}

	viewCredit(row: CreditDto) {
		if (this.selectedCredit != null) {
			const dialogRef = this.dialog.open(CreditInfoDialogComponent, {
				data: { selectedRow: row },
			});
		}
	}

	fetchAllData(): void {
		if (!this.selectedAccount) return;

		this.creditService
			.getFindAll(this.selectedAccount.accountNumber.replaceAll('-', ''))
			.pipe(
				map(dataSource => {
					this.dataSource.data = dataSource;
					return dataSource;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	fetchAccounts(): void {
		const emailLocal = this.authService.getUserEmail();
		if (!emailLocal) return;

		this.bankService
			.getFindByEmail(emailLocal)
			.pipe(
				map(dataSource => {
					this.accountNumberDataSource.data = dataSource;
					this.selectAccountRow(dataSource[0]);
					return dataSource;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}
}
