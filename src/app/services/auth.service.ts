import { EventEmitter, inject, Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { LoginResponseDto } from "../dtos/login-response-dto";
import { AuthCredentialsDto } from "../dtos/auth-credentials-dto";
import { Router } from "@angular/router";
import { EmployeeDto } from "../dtos/employee-dto";
import { ApiRoutes } from "./api-routes";
import { PermissionDto } from "../dtos/permissions-dto";
import { RolesDto } from "../dtos/roles-dto";
import { tap } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { DecodedTokenDto, Role } from "../dtos/decoded-token-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.iAmServiceApiUrl;
  authUrls = ApiRoutes.auth;

  http = inject(HttpClient);
  router = inject(Router);

  token = localStorage.getItem('token');
  // Add an EventEmitter
  public roleUpdated: EventEmitter<Role | null> = new EventEmitter();
  constructor() { }

  login(credentials: AuthCredentialsDto) {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}${this.authUrls.login}`,
      {
        email: credentials.email,
        password: credentials.password
      }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        const tokenString = response.token;
        const decodedToken: any = jwtDecode(tokenString);
        localStorage.setItem('id', decodedToken.id);
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('permissions', decodedToken.permissions)
        // Emit an event when the user logs in to update the role
        this.roleUpdated.emit(this.getRoleFromToken());
      }
      )
    );
  }

  activateEmployee(credentials: AuthCredentialsDto) {
    return this.http.put<EmployeeDto>(`${this.apiUrl}${this.authUrls.activateEmployee}`,
      {
        email: credentials.email,
        password: credentials.password
      })
  }

  getPermissions() {
    return this.http.get<PermissionDto[]>(`${this.apiUrl}${this.authUrls.allPermissions}`);
  }

  getRoles() {
    return this.http.get<RolesDto[]>(`${this.apiUrl}${this.authUrls.allRoles}`);
  }

  getRoleFromToken() {
    if (this.token) {
      const decodedToken = jwtDecode<DecodedTokenDto>(this.token);
      return decodedToken.role;
    }
    return null;
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
