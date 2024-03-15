import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Role} from "../../dto/decoded-token.dto";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {
  // Add a subscription variable
  private roleUpdateSubscription: Subscription | undefined;
  authService = inject(AuthService);
  role: Role | null = null;
  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.role = this.authService.getRoleFromToken();

    // Subscribe to role updates
    this.roleUpdateSubscription = this.authService.roleUpdated.subscribe((role: Role | null) => {
      this.role = role;
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.roleUpdateSubscription?.unsubscribe();
  }

  checkTokenRole(roleArray: string[]) {
    if(!this.role) return false;
    return roleArray.includes(this.role);
  }

}
