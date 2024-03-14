import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AlertInterceptor implements HttpInterceptor {

  private snackBar = inject(MatSnackBar);
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token') ?? '';

    request = request.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
      }
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unknown error occurred!";

        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = `${error.error.message}`;
        } else {
          // Server-side errors
          switch (error.status) {
            case 401:
              errorMessage = "Unauthorized access!";
              // can possibly redirect to login page
              break;
            case 403:
              errorMessage = "Access denied!";
              // can possibly redirect to forbidden page
              break;
            case 404:
              errorMessage = "Resource not found!";
              break;
            case 500:
              errorMessage = "Internal server error!";
              break;
            default:
              errorMessage = `${error.message}`;
              break;
          }
        }

        this.snackBar.open(errorMessage, "Close", {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['error-snackbar']
        });

        throw error;
      }
      )
    )
  }
}
