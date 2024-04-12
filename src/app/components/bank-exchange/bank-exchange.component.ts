import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { DropdownOption, DropdownOptions } from 'src/app/utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ExchangeRatesDto } from 'src/app/dtos/exchange-rates-dto';
import { ExchangeRequestDto } from 'src/app/dtos/exchange-request-dto';
import { AccountDto } from 'src/app/dtos/account-dto';
import { AccountService } from 'src/app/services/bank-service/account.service';
import { BankExchangeService } from 'src/app/services/bank-service/bank-exchange.service';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-bank-exchange',
	templateUrl: './bank-exchange.component.html',
	styleUrls: ['./bank-exchange.component.css'],
})
export class BankExchangeComponent implements AfterViewInit {
	accountService = inject(AccountService);
	bankExchangeService = inject(BankExchangeService);

	displayedAccountColumns: string[] = [
		'accountType',
		'accountNumber',
		'availableBalance',
		'currencyCode',
	];
	accountNumberDataSource = new MatTableDataSource<AccountDto>();

	currencyOptions: DropdownOption[] = DropdownOptions.currencyCodes;
	displayedColumns: string[] = [
		'id',
		'timeLastUpdated',
		'timeNextUpdate',
		'fromCurrency',
		'toCurrency',
		'exchangeRate',
	];
	dataSource = new MatTableDataSource<ExchangeRatesDto>();
	selectedRow: ExchangeRatesDto | null = null;
	fromCurrency: string = 'RSD';

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	exchangeForm = this.fb.group({
		fromAccount: ['', [Validators.required]],
		toAccount: ['', [Validators.required]],
		amount: ['', [Validators.required, Validators.min(0)]],
	});
	accountOptionsSender: AccountDto[] = [];
	accountOptionsReciever: AccountDto[] = [];

	constructor(
		private fb: FormBuilder,
		public dialog: MatDialog,
	) {
		this.dataSource = new MatTableDataSource();
		this.accountNumberDataSource = new MatTableDataSource();
		this.getAccounts();
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

	selectRow(row: ExchangeRatesDto): void {
		if (this.selectedRow?.id != row.id) {
			this.selectedRow = row;
		}
	}

		getAccounts() {
		const emailLocal = localStorage.getItem('email');
		if (!emailLocal) return;

		this.accountService
			.getFindByEmail(emailLocal)
			.pipe(
				map(Response => {
					this.accountOptionsSender = Response;
					this.accountOptionsReciever = Response;
					this.accountNumberDataSource.data = Response;
					console.log(
						'accNumberDataSource',
						this.accountNumberDataSource.data,
					);

					console.log(this.accountOptionsSender);
					return Response;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	fetchAllData(): void {
		console.log(this.fromCurrency);
		this.bankExchangeService
			.getAllExchangeRates(this.fromCurrency)
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

	sendExchangeRequest(): void {
		if (this.exchangeForm.valid) {
			const exchangeRequestDto = this.exchangeForm
				.value as unknown as ExchangeRequestDto;
			this.bankExchangeService
				.postExchangeCurrency(exchangeRequestDto)
				.pipe(
					map(response => {
						console.log(response);
						this.exchangeForm.reset();
						this.exchangeForm.markAsPristine();
						this.getAccounts();
					}),
					catchError(error => {
						console.error('Error loading data.', error);
						return throwError(() => error);
					}),
				)
				.subscribe();
		}
	}
}
