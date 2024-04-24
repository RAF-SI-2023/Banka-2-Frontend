import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	inject,
	ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AccountDto } from '../../dtos/account-dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../../services/bank-service/account.service';
import { catchError, map } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { ExchangeRequestDto } from '../../dtos/exchange-request-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { BankExchangeService } from '../../services/bank-service/bank-exchange.service';
import { Role } from 'src/app/dtos/decoded-token-dto';
import { AuthService } from 'src/app/services/iam-service/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
	authService = inject(AuthService);
	accountService = inject(AccountService);
	bankExchangeService = inject(BankExchangeService);

	private loginSubscription: Subscription | undefined;
	private changeDetector = inject(ChangeDetectorRef);
	role: Role | null = null;
	activeEmail: string | null = null;

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
		public dialog: MatDialog,
		private fb: FormBuilder,
	) {
		this.accountNumberDataSource = new MatTableDataSource();
		this.role = this.authService.getRoleFromToken();

		// Subscribe to role updates
		this.loginSubscription = this.authService.loginStatus.subscribe(() => {
			this.role = this.authService.getRoleFromToken();
			this.changeDetector.detectChanges();
		});
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
		let emailLocal;
		if (
			this.checkTokenRole([
				Role.ADMIN,
				Role.EMPLOYEE,
				Role.SUPERVISOR,
				Role.AGENT,
			])
		) {
			console.log('kurac');
			emailLocal = 'bankAccount@bank.rs';
		} else {
			emailLocal = localStorage.getItem('email');
		}
		if (!emailLocal) return;
		this.activeEmail = localStorage.getItem('email');

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

	checkTokenRole(roleArray: string[]) {
		console.log(this.role);
		if (!this.role) return false;
		return roleArray.includes(this.role);
	}

	protected readonly Role = Role;
}
