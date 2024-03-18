import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = authService.getRoleFromToken();
  const routeRoles = route.data['roles'];

  if (routeRoles && !routeRoles.includes(userRole)) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
