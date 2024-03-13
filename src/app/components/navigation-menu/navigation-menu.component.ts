import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
