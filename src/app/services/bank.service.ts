import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiRoutes } from './api-routes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor(private httpClient: HttpClient) {}

  // AccountController
  /// POST
  postAssociateProfileInitialization(accountNumber: string) {
    return this.httpClient.post<boolean>(
      `${environment.bankServiceApiUrl}${ApiRoutes.accounts.associateProfileInit}`,
      {
        accountNumber: accountNumber,
      }
    );
  }

  postCodeConfirmation(code: string, accountNumber: string) {
    return this.httpClient.post<boolean>(
      `${environment.bankServiceApiUrl}${ApiRoutes.accounts.codeConfirmation}/${accountNumber}`,
      code
    );
  }
}
