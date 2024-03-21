import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiRoutes } from './api-routes';
import { HttpClient } from '@angular/common/http';
import { DomesticAccountDto } from '../dtos/domestic-account-dto';
import { ForeignAccountDto } from '../dtos/foreign-account-dto';

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

  postCreateDomesticAccount(account: DomesticAccountDto) {
    return this.httpClient.post<boolean>(
      `${environment.bankServiceApiUrl}${ApiRoutes.accounts.createAccountDomestic}`,
      account
    );
  }

  postCreateForeignAccount(account: ForeignAccountDto) {
    return this.httpClient.post<boolean>(
      `${environment.bankServiceApiUrl}${ApiRoutes.accounts.createAccountForeign}`,
      account
    );
  }
}
