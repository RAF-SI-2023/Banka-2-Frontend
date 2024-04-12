import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AccountDto} from "../../dtos/account-dto";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CreditService} from "../../services/bank-service/credit.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AccountService} from "../../services/bank-service/account.service";
import {AuthService} from "../../services/iam-service/auth.service";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {ExchangeRequestDto} from "../../dtos/exchange-request-dto";
import {FormBuilder, Validators} from "@angular/forms";
import {BankExchangeService} from "../../services/bank-service/bank-exchange.service";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit{
	accountService = inject(AccountService);
	bankExchangeService = inject(BankExchangeService);

	displayedAccountColumns: string[] = [
		'accountType',
		'accountNumber',
		'availableBalance',
		'currencyCode',
	];
	accountNumberDataSource = new MatTableDataSource<AccountDto>();

	exchangeForm = this.fb.group({
		fromAccount: ['', [Validators.required]],
		toAccount: ['', [Validators.required]],
		amount: ['', [Validators.required, Validators.min(0)]],
	});
	accountOptionsSender: AccountDto[] = [];
	accountOptionsReciever: AccountDto[] = [];


	@ViewChild(MatPaginator) accountNumberPaginator: MatPaginator | undefined;
	@ViewChild(MatSort) accountNumberSort: MatSort | undefined;

	constructor(
		private creditService: CreditService,
		public dialog: MatDialog,
		private router: Router,
		private bankService: AccountService,
		private authService: AuthService,
		private fb: FormBuilder,
	) {
		this.accountNumberDataSource = new MatTableDataSource();
		this.getAccounts();
	}

	ngAfterViewInit() {
		if (this.accountNumberPaginator)
			this.accountNumberDataSource.paginator =
				this.accountNumberPaginator;
		if (this.accountNumberSort)
			this.accountNumberDataSource.sort = this.accountNumberSort;
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
						this.exchangeForm.markAsUntouched();
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
