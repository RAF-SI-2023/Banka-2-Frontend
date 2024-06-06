import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ApiRoutes } from '../api-routes';
import { BankTransferTransactionDetailsDto } from 'src/app/dtos/bank-transfer-transaction-details-dto';

@Injectable({
	providedIn: 'root',
})
export class BankTransferTransactionDetailsService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getAll() {
		return this.httpClient.get<BankTransferTransactionDetailsDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.bankTransferTransactionDetails.getAll}`,
		);
	}

	getTotalProfit() {
		return this.httpClient.get<number>(
			`${environment.bankServiceApiUrl}${ApiRoutes.bankTransferTransactionDetails.getTotalProfit}`,
		);
	}
}
