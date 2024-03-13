import { inject, Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { LoginResponseDto } from "../dto/response/login-response.dto";
import { LoginRequestDto } from "../dto/request/login-request.dto";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  router = inject(Router);

  constructor() { }

  login(credentials: LoginRequestDto): Observable<LoginResponseDto | any> {
    return this.http.post(`${this.apiUrl}/login`,
      {
        email: credentials.email,
        password: credentials.password
      }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
