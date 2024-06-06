import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginResponseDto } from '../../dtos/login-response-dto';
import { AuthCredentialsDto } from '../../dtos/auth-credentials-dto';
import { Router } from '@angular/router';
import { ApiRoutes } from '../api-routes';
import { PermissionDto } from '../../dtos/permissions-dto';
import { RolesDto } from '../../dtos/roles-dto';
import { Subject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { DecodedTokenDto } from '../../dtos/decoded-token-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	http = inject(HttpClient);
	router = inject(Router);
	matSnackBar = inject(MatSnackBar);

	token = localStorage.getItem('token');

	public loginStatus: Subject<boolean> = new Subject<boolean>();

	login(credentials: AuthCredentialsDto) {
		return this.http
			.post<LoginResponseDto>(
				`${environment.iamServiceApiUrl}${ApiRoutes.auth.login}`,
				{
					email: credentials.email,
					password: credentials.password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			.pipe(
				tap(response => {
					localStorage.setItem('token', response.token);
					const tokenString = response.token;
					const decodedToken: any = jwtDecode(tokenString);
					localStorage.setItem('id', decodedToken.id);
					localStorage.setItem('email', decodedToken.email);
					localStorage.setItem(
						'permissions',
						decodedToken.permissions,
					);
					this.loginStatus.next(true);
				}),
			);
	}

	getPermissions() {
		return this.http.get<PermissionDto[]>(
			`${environment.iamServiceApiUrl}${ApiRoutes.auth.allPermissions}`,
		);
	}

	getRoles() {
		return this.http.get<RolesDto[]>(
			`${environment.iamServiceApiUrl}${ApiRoutes.auth.allRoles}`,
		);
	}

	getUserEmail() {
		return localStorage.getItem('email');
	}

	getToken() {
		return localStorage.getItem('token');
	}

	getRoleFromToken() {
		if (this.token) {
			const decodedToken = jwtDecode<DecodedTokenDto>(this.token);
			return decodedToken.role;
		}
		return null;
	}

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('id');
		localStorage.removeItem('email');
		localStorage.removeItem('permissions');
		this.loginStatus.next(false);
		this.router.navigate(['/login']);
	}

	isTokenExpired() {
		if (this.token) {
			const decodedToken = jwtDecode<DecodedTokenDto>(this.token);
			const expirationDate = new Date(decodedToken.exp * 1000);
			if (expirationDate < new Date()) {
				this.matSnackBar.open('Vaša sesija je istekla!', 'Zatvori', {
					duration: 4000,
					horizontalPosition: 'center',
					verticalPosition: 'top',
				});
				this.logout();
				return true;
			}
			return false;
		}
		return true; // Token doesn't exist or expired
	}
}
