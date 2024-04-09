import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiRoutes } from '../api-routes';
import { HttpClient } from '@angular/common/http';
import { DomesticAccountDto } from '../../dtos/domestic-account-dto';
import { ForeignAccountDto } from '../../dtos/foreign-account-dto';
import { CompanyAccountDto } from '../../dtos/company-account-dto';
import { AccountDto } from '../../dtos/account-dto';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	constructor(private httpClient: HttpClient) {}

	// AccountController
	/// GET
	getFindByEmail(email: string) {
		return this.httpClient.get<AccountDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.accounts.findAccountsByEmail}/${email}`,
		);
	}

	/// POST
	postAssociateProfileInitialization(accountNumber: string) {
		return this.httpClient.post<boolean>(
			`${environment.bankServiceApiUrl}${ApiRoutes.accounts.associateProfileInitialization}`,
			{
				accountNumber: accountNumber,
			},
		);
	}

	postCodeConfirmation(code: string, accountNumber: string) {
		return this.httpClient.post<boolean>(
			`${environment.bankServiceApiUrl}${ApiRoutes.accounts.confirmActivationCode}/${accountNumber}`,
			code,
		);
	}

	postCreateDomesticAccount(account: DomesticAccountDto) {
		return this.httpClient.post<boolean>(
			`${environment.bankServiceApiUrl}${ApiRoutes.accounts.createDomesticAccount}`,
			account,
		);
	}

	postCreateForeignAccount(account: ForeignAccountDto) {
		return this.httpClient.post<boolean>(
			`${environment.bankServiceApiUrl}${ApiRoutes.accounts.createForeignAccount}`,
			account,
		);
	}

	postCreateCompanyAccount(account: CompanyAccountDto) {
		return this.httpClient.post<boolean>(
			`${environment.bankServiceApiUrl}${ApiRoutes.accounts.createBusinessAccount}`,
			account,
		);
	}
}
