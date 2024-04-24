import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiRoutes } from '../api-routes';
import { HttpClient } from '@angular/common/http';
import { DomesticAccountDto } from '../../dtos/domestic-account-dto';
import { ForeignAccountDto } from '../../dtos/foreign-account-dto';
import { BusinessAccountDto } from '../../dtos/business-account-dto';
import { AccountDto } from '../../dtos/account-dto';
import {map} from "rxjs/operators";

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getFindByEmail(email: string) {
		return this.httpClient.get<AccountDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.accounts.findAccountsByEmail}/${email}`,
		);
	}

	hasAccounts() {
		//get all accounts by email
		const email = localStorage.getItem('email');
		const accounts = this.getFindByEmail(email!).pipe(
			//check if there are any accounts
			map((accounts) => accounts.length > 0),
		)
		return accounts;
	}

	// POST
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

	postCreateCompanyAccount(account: BusinessAccountDto) {
		return this.httpClient.post<boolean>(
			`${environment.bankServiceApiUrl}${ApiRoutes.accounts.createBusinessAccount}`,
			account,
		);
	}
}
