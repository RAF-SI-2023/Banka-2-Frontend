import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { digitValidator } from 'src/app/utils/validators/digit.validator';
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
import { FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'app-bank-exchange',
	templateUrl: './bank-exchange.component.html',
	styleUrls: ['./bank-exchange.component.css'],
})
export class BankExchangeComponent implements OnInit {
	accountService = inject(AccountService);
	bankExchangeService = inject(BankExchangeService);

	availableBalanceFromAcc = -1;
	currencyCodeFromAcc = '';
	availableBalanceToAcc = -1;
	currencyCodeToAcc = '';

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
	fromCurrency = 'RSD';

	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;

	exchangeForm = this.fb.group({
		fromAccount: ['', [Validators.required]],
		toAccount: ['', [Validators.required]],
		amount: [
			'',
			[Validators.required, Validators.min(0), digitValidator()],
		],
	});
	accountOptionsSender: AccountDto[] = [];
	accountOptionsReciever: AccountDto[] = [];

	constructor(
		private fb: FormBuilder,
		public dialog: MatDialog,
	) {
		this.dataSource = new MatTableDataSource();
		this.fetchAllData();
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

	ngOnInit(): void {
		this.getAccounts();
		this.exchangeForm
			.get('fromAccount')
			?.valueChanges.subscribe(Response => {
				this.getAccountBalance(Response, true); // Pass true for FromAcc
			});
		this.exchangeForm.get('toAccount')?.valueChanges.subscribe(Response => {
			this.getAccountBalance(Response, false); // Pass false for ToAcc
		});
	}

	initTableElements() {
		if (this.paginator) this.dataSource.paginator = this.paginator;
		if (this.sort) this.dataSource.sort = this.sort;
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

					console.log(this.accountOptionsSender);
					return Response;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	getAccountBalance(accountNumber: any, isFromAccount: boolean): void {
		const emailLocal = localStorage.getItem('email');
		if (!emailLocal) return;

		this.accountService
			.getFindByEmail(emailLocal)
			.subscribe((Response: any[]) => {
				const account = Response.find(
					data => data.accountNumber == accountNumber,
				);
				if (!account) return; // Account not found

				if (isFromAccount) {
					this.availableBalanceFromAcc = account.availableBalance;
					this.currencyCodeFromAcc = account.currencyCode;
				} else {
					this.availableBalanceToAcc = account.availableBalance;
					this.currencyCodeToAcc = account.currencyCode;
				}
			});
	}

	fetchAllData(): void {
		console.log(this.fromCurrency);
		this.bankExchangeService
			.getAllExchangeRates(this.fromCurrency)
			.pipe(
				map(dataSource => {
					this.dataSource.data = dataSource;
					this.initTableElements();
					return dataSource;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	sendExchangeRequest(formDirective: FormGroupDirective): void {
		if (this.exchangeForm.valid) {
			const exchangeRequestDto = this.exchangeForm
				.value as unknown as ExchangeRequestDto;
			this.bankExchangeService
				.postExchangeCurrency(exchangeRequestDto)
				.pipe(
					map(response => {
						console.log(response);
						formDirective.resetForm();
						this.exchangeForm.reset();
						this.getAccounts();
						this.availableBalanceFromAcc = -1;
						this.availableBalanceToAcc = -1;
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
