import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {LoginResponseDto} from "../dto/login-response.dto";
import {AuthCredentialsDto} from "../dto/auth-credentials.dto";
import {Router} from "@angular/router";
import {EmployeeDto} from "../dto/EmployeeDto";
import {ApiRoutes} from "./api-routes";
import {PermissionDto} from "../dto/permissions.dto";
import {RolesDto} from "../dto/roles.dto";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  authUrls = ApiRoutes.auth;

  http = inject(HttpClient);
  router = inject(Router);

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
        }
      )
    );
  }

  activateEmployee(credentials: AuthCredentialsDto) {
    return this.http.put<EmployeeDto>(`${this.apiUrl}${this.authUrls.activateEmployee}`,
      {
        email: credentials.email,
        password: credentials.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  getPermissions() {
    return this.http.get<PermissionDto[]>(`${this.apiUrl}${this.authUrls.allPermissions}`);
  }

  getRoles() {
    return this.http.get<RolesDto[]>(`${this.apiUrl}${this.authUrls.allRoles}`);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
