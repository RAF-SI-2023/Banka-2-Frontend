import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiRoutes } from '../api-routes';
import { MarginTransactionDto } from 'src/app/dtos/margin-transaction-dto';
import { MarginTransactionResponseDto } from 'src/app/dtos/margin-transaction-response-dto';

@Injectable({
	providedIn: 'root',
})
export class MarginTransactionService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getAllMarginsTransactionByEmail(email: string) {
		return this.httpClient.get<MarginTransactionResponseDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.marginsTransaction.getAllMarginsTransactionByEmail}` +
				'/' +
				email,
		);
	}

	getMarginsTransactionAccount(id: number) {
		return this.httpClient.get<MarginTransactionDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.marginsTransaction.getMarginsTransactionAccount}` +
				'/' +
				id,
		);
	}

	// POST
	postMarginsTransaction(marginTransactionDto: MarginTransactionDto) {
		return this.httpClient.post<MarginTransactionDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.marginsTransaction.postMarginsTransaction}`,
			marginTransactionDto,
		);
	}
}
