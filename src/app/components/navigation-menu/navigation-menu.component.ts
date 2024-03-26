import {
	ChangeDetectorRef,
	Component,
	inject,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../dtos/decoded-token-dto';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-navigation-menu',
	templateUrl: './navigation-menu.component.html',
	styleUrls: ['./navigation-menu.component.css'],
})
export class NavigationMenuComponent implements OnInit, OnDestroy {
	private loginSubscription: Subscription | undefined;
	private changeDetector = inject(ChangeDetectorRef);
	authService = inject(AuthService);
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
}
