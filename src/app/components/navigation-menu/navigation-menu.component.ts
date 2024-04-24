import {
	ChangeDetectorRef,
	Component,
	inject,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { AuthService } from '../../services/iam-service/auth.service';
import { Role } from '../../dtos/decoded-token-dto';
import {Subscription, throwError} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {AccountService} from "../../services/bank-service/account.service";
import {AccountDto} from "../../dtos/account-dto";

@Component({
	selector: 'app-navigation-menu',
	templateUrl: './navigation-menu.component.html',
	styleUrls: ['./navigation-menu.component.css'],
})
export class NavigationMenuComponent implements OnInit, OnDestroy {
	authService = inject(AuthService);
	bankService = inject(AccountService);
	private accounts: AccountDto[] = []
	protected hasAccounts = false;
	private loginSubscription: Subscription | undefined;
	private changeDetector = inject(ChangeDetectorRef);
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
	}

	ngOnDestroy() {
		// Unsubscribe to prevent memory leaks
		this.loginSubscription?.unsubscribe();
	}

	checkTokenRole(roleArray: string[]) {
		if (!this.role) return false;
		return roleArray.includes(this.role);
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
}
