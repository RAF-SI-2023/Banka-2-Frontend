import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Role} from "../../dto/decoded-token.dto";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {
  authService = inject(AuthService);
  role: Role | null = null;
  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.role = this.authService.getRoleFromToken();
  }

  checkTokenRole(roleArray: string[]) {
    if(!this.role) return false;
    return roleArray.includes(this.role);
  }

}
