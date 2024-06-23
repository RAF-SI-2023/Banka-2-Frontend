import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarginAccountDto } from 'src/app/dtos/margin-account-dto';
import { environment } from 'src/environments/environment';
import { ApiRoutes } from '../api-routes';

@Injectable({
	providedIn: 'root',
})
export class MarginAccountsService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getMarginsAccount(id: number) {
		return this.httpClient.get<MarginAccountDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.marginsAccountService.getMarginsAccount}` +
				'/' +
				id,
		);
	}

	getAllById(id: number) {
		return this.httpClient.get<MarginAccountDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.marginsAccountService.getAllByUserId}` +
				'/' +
				id,
		);
	}

	getAllByEmail(email: string) {
		return this.httpClient.get<MarginAccountDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.marginsAccountService.getAllByEmail}` +
				'/' +
				email,
		);
	}

	getAllbyAccountNumber(accountNumber: number) {
		return this.httpClient.get<MarginAccountDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.marginsAccountService.getAllByAccountNumber}` +
				'/' +
				accountNumber,
		);
	}

	// POST
	postMarginsAccount(marginAccountDto: MarginAccountDto) {
		return this.httpClient.post<MarginAccountDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.marginsAccountService.postMarginsAccount}`,
			marginAccountDto,
		);
	}

	// PATCH
	patchMarginsAccount(marginTransactionDto: MarginAccountDto) {
		return this.httpClient.patch<MarginAccountDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.marginsAccountService.patchMarginsAccount}`,
			marginTransactionDto,
		);
	}

	// PUT
	putMarginsAccount(id: number, marginAccountDto: MarginAccountDto) {
		return this.httpClient.post<MarginAccountDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.marginsAccountService.putMarginsAccount}` +
				'/' +
				id,
			marginAccountDto,
		);
	}

	// DELETE
	deleteMarginsAccount(id: number) {
		return this.httpClient.delete<MarginAccountDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.marginsAccountService.deleteMarginsAccount}` +
				'/' +
				id,
		);
	}
}
