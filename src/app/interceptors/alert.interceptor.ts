import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/iam-service/auth.service';

@Injectable()
export class AlertInterceptor implements HttpInterceptor {
	constructor(
		private authService: AuthService,
		private snackBar: MatSnackBar,
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		const token = localStorage.getItem('token') ?? '';

		request = request.clone({
			setHeaders: {
				'Authorization': token ? `Bearer ${token}` : '',
				'Content-Type': 'application/json',
			},
		});

		if (token) {
			if (this.authService.isTokenExpired()) {
				this.authService.router.navigate(['/login']);
				return throwError(() => 'Vaša sesija je istekla!');
			}
		}

		return next.handle(request).pipe(
			tap((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse && request.method !== 'GET') {
					this.snackBar.open('Zahtev je uspešan!', 'Zatvori', {
						duration: 4000,
						verticalPosition: 'top',
						horizontalPosition: 'right',
						panelClass: ['app-notification-success'],
					});
				}
			}),
			catchError((error: HttpErrorResponse) => {
				let errorMessage = 'Desila se nepoznata greška!';
				let additionalMessage = '';

				if (error.error instanceof ErrorEvent) {
					// Client-side errors
					errorMessage = `${error.error.message}`;
				} else {
					// Server-side errors
					switch (error.status) {
						case 0:
							errorMessage = 'Zahtev nije uspeo!';
							break;
						case 400:
							errorMessage = 'Loš zahtev!';
							break;
						case 401:
							errorMessage = 'Neautorizovan pristup!';
							break;
						case 403:
							errorMessage = 'Zabranjen pristup!';
							break;
						case 404:
							errorMessage = 'Stranica nije pronađena!';
							break;
						case 500:
							errorMessage = 'Interna greška servera!';
							break;
						default:
							errorMessage = `${error.message}`;
							break;
					}

					// Check if backend returned additional message
					if (error.error && typeof error.error === 'string') {
						additionalMessage = `${error.error}.`;
					} else if (error.error && typeof error.error === 'object') {
						additionalMessage = error.error.message || '';
					}
				}

				// Concatenate main error message and additional message with new line
				errorMessage += additionalMessage
					? `\n${additionalMessage}`
					: '';

				this.snackBar.open(errorMessage, 'Zatvori', {
					duration: 4000,
					verticalPosition: 'top',
					horizontalPosition: 'right',
					panelClass: ['app-notification-error'],
				});

				throw error;
			}),
		);
	}
}
