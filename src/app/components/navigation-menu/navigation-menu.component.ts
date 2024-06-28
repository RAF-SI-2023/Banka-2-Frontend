import {
	ChangeDetectorRef,
	Component,
	inject,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { AuthService } from '../../services/iam-service/auth.service';
import { Role } from '../../dtos/decoded-token-dto';
import { Subscription, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountService } from '../../services/bank-service/account.service';
import { AccountDto } from '../../dtos/account-dto';
import { UserService } from 'src/app/services/iam-service/user.service';
import { UserDto } from 'src/app/dtos/user-dto';
import { isCompanyEmployeeDto } from 'src/app/dtos/company-employee-dto';

@Component({
	selector: 'app-navigation-menu',
	templateUrl: './navigation-menu.component.html',
	styleUrls: ['./navigation-menu.component.css'],
})
export class NavigationMenuComponent implements OnInit, OnDestroy {
	authService = inject(AuthService);
	bankService = inject(AccountService);
	userService = inject(UserService);
	private accounts: AccountDto[] = [];
	protected hasAccounts = false;
	private loginSubscription: Subscription | undefined;
	private changeDetector = inject(ChangeDetectorRef);

	isBank = true; // Default to 'Bank'
	isStockMarket = false;
	selectedToggle = 'bank';

	activeUser: UserDto | null = null;
	role: Role | null = null;

	logout() {
		this.authService.logout();
	}

	ngOnInit() {
		this.role = this.authService.getRoleFromToken();

		// Subscribe to role updates
		this.loginSubscription = this.authService.loginStatus.subscribe(() => {
			this.role = this.authService.getRoleFromToken();
			this.changeDetector.detectChanges();
		});
		this.fetchAccounts();
		if (this.checkTokenRole([Role.EMPLOYEE, Role.SUPERVISOR, Role.AGENT])) {
			this.isBank = false;
			this.isStockMarket = true;
			this.selectedToggle = 'stock';
		}
	}

	ngOnDestroy() {
		// Unsubscribe to prevent memory leaks
		this.loginSubscription?.unsubscribe();
	}

	checkTokenRole(roleArray: string[]) {
		if (!this.role) return false;
		return roleArray.includes(this.role);
	}

	onToggleChange(event: any): void {
		const value = event.value;
		this.isBank = value === 'bank';
		this.isStockMarket = value === 'stock';
		this.selectedToggle = value;
	}

	protected readonly Role = Role;

	fetchAccounts(): void {
		const emailLocal = this.authService.getUserEmail();
		if (!emailLocal) return;

		this.bankService
			.getFindByEmail(emailLocal)
			.pipe(
				map(dataSource => {
					this.accounts = dataSource;
					this.hasAccounts = this.accounts.length > 0;
					return dataSource;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	fetchActiveUserData() {
		this.userService
			.getFindById(Number(localStorage.getItem('id')))
			.pipe(
				map(data => {
					this.activeUser = data;
					return this.activeUser;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	hasPib(): boolean {
		if (this.activeUser && isCompanyEmployeeDto(this.activeUser)) {
			return true;
		}
		return false;
	}
}
