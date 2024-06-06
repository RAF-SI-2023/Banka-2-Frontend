import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ApiRoutes } from '../api-routes';
import { OrderTransactionDto } from 'src/app/dtos/order-transaction-dto';

@Injectable({
	providedIn: 'root',
})
export class OrderTransactionService {
	constructor(private httpClient: HttpClient) {}

	// GET
	findAll() {
		return this.httpClient.get<OrderTransactionDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.orderTransaction.findAll}`,
		);
	}

	findById(id: number) {
		return this.httpClient.get<OrderTransactionDto>(
			environment.bankServiceApiUrl +
				ApiRoutes.orderTransaction.findById +
				'/' +
				id,
		);
	}

	findByOrderId(orderId: number) {
		return this.httpClient.get<OrderTransactionDto>(
			environment.bankServiceApiUrl +
				ApiRoutes.orderTransaction.findByOrderId +
				'/' +
				orderId,
		);
	}

	findAllByAccountNumber(accountNumber: number) {
		return this.httpClient.get<OrderTransactionDto>(
			environment.bankServiceApiUrl +
				ApiRoutes.orderTransaction.findAllByAccountNumber +
				'/' +
				accountNumber,
		);
	}
}
