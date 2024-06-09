import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SimpleTransactionDto } from 'src/app/dtos/simple-transaction-dto';
import { MoneyTransactionDto } from 'src/app/dtos/money-transaction-dto';
import { ApiRoutes } from '../api-routes';
import { InternalTransactionResponseDto } from 'src/app/dtos/internal-transaction-response-dto';
import { ExternalTransactionResponseDto } from 'src/app/dtos/external-transaction-response-dto';

@Injectable({
	providedIn: 'root',
})
export class TransactionService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getAllTransactionsByEmail(email: string) {
		return this.httpClient.get<MoneyTransactionDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.transferTransaction.getAllTransactions}/${email}`,
		);
	}

	// PATCH
	patchTransactionVerify(transactionId: number, verificationToken: string) {
		return this.httpClient.patch(
			`${environment.bankServiceApiUrl}${ApiRoutes.transferTransaction.patchVerifyTransaction}/${transactionId}?verificationToken=${verificationToken}`,
			null,
		);
	}

	// POST
	postTransactionExternal(transactionDto: SimpleTransactionDto) {
		return this.httpClient.post<ExternalTransactionResponseDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.transferTransaction.createExternalTransaction}`,
			transactionDto,
		);
	}

	postTransactionInternal(transactionDto: SimpleTransactionDto) {
		return this.httpClient.post<InternalTransactionResponseDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.transferTransaction.createInternalTransaction}`,
			transactionDto,
		);
	}
}
