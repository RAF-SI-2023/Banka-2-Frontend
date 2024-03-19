import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Banka-2-Frontend';
  router = inject(Router);
  showToolbar: boolean = true;

  constructor() {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Determine if toolbar should be displayed based on current route
        const excludedRoutes = ['/', '/login', '/create-bank-profile'];
        this.showToolbar = !excludedRoutes.includes(event.url);
      }
    });
  }
}
