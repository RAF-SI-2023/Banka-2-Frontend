import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService);

  if (authService.isTokenExpired()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
