import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockDto } from '../dtos/stock-dto';
import { environment } from '../../environments/environment.development';
import { ApiRoutes } from './api-routes';
import { CreditDto } from '../dtos/credit-dto';
import { CreateCreditRequestDto } from '../dtos/create-credit-request-dto';

@Injectable({
	providedIn: 'root',
})
export class CreditService {
	constructor(private httpClient: HttpClient) {}

	// StockController
	/// GET
	getFindAll(accountNumber: string) {
		return this.httpClient.get<CreditDto[]>(
			environment.bankServiceApiUrl +
				ApiRoutes.credits.findAll +
				'/' +
				accountNumber,
		);
	}

	getFindByCreditNumber(creditNumber: number) {
		return this.httpClient.get<CreditDto>(
			environment.bankServiceApiUrl +
				ApiRoutes.credits.findByCreditNumber +
				'/' +
				creditNumber,
		);
	}

	getFindAllCreditRequests() {
		return this.httpClient.get<CreateCreditRequestDto[]>(
			environment.bankServiceApiUrl +
				ApiRoutes.credits.findAllCreditRequests,
		);
	}

	getCreditRequestById(id: number) {
		return this.httpClient.get<CreditDto>(
			environment.bankServiceApiUrl +
				ApiRoutes.credits.getCreditRequestById +
				'/' +
				id,
		);
	}

	/// POST
	postCreateCreditRequest(createCreditRequestDto: CreateCreditRequestDto) {
		return this.httpClient.post<CreateCreditRequestDto>(
			environment.bankServiceApiUrl +
				ApiRoutes.credits.createCreditRequest,
			createCreditRequestDto,
		);
	}

	postApproveCreditRequest(creditRequestId: number) {
		return this.httpClient.post<number>(
			environment.bankServiceApiUrl +
				ApiRoutes.credits.approveAndCreate +
				'/' +
				creditRequestId,
			null,
		);
	}

	/// PUT
	putDenyCreditRequest(creditRequestId: number) {
		return this.httpClient.put<number>(
			environment.bankServiceApiUrl +
				ApiRoutes.credits.denyCreditRequest +
				'/' +
				creditRequestId,
			null,
		);
	}
}
