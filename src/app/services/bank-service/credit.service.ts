import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ApiRoutes } from '../api-routes';
import { CreditDto } from '../../dtos/credit-dto';
import { CreditRequestDto } from '../../dtos/credit-request-dto';

@Injectable({
	providedIn: 'root',
})
export class CreditService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getFindAll(accountNumber: string) {
		return this.httpClient.get<CreditDto[]>(
			environment.bankServiceApiUrl +
				ApiRoutes.credit.findAll +
				'/' +
				accountNumber,
		);
	}

	getFindByCreditNumber(creditNumber: number) {
		return this.httpClient.get<CreditDto>(
			environment.bankServiceApiUrl +
				ApiRoutes.credit.findByCreditNumber +
				'/' +
				creditNumber,
		);
	}

	getAllPendingCreditRequests() {
		return this.httpClient.get<CreditRequestDto[]>(
			environment.bankServiceApiUrl +
				ApiRoutes.credit.getAllPendingCreditRequests,
		);
	}

	getCreditRequestById(creditRequestId: number) {
		return this.httpClient.get<CreditDto>(
			environment.bankServiceApiUrl +
				ApiRoutes.credit.getCreditRequestById +
				'/' +
				creditRequestId,
		);
	}

	// POST
	postCreateCreditRequest(creditRequestDto: CreditRequestDto) {
		return this.httpClient.post<CreditRequestDto>(
			environment.bankServiceApiUrl +
				ApiRoutes.credit.createCreditRequest,
			creditRequestDto,
		);
	}

	postApproveCreditRequest(creditRequestId: number) {
		return this.httpClient.post<number>(
			environment.bankServiceApiUrl +
				ApiRoutes.credit.approveAndCreate +
				'/' +
				creditRequestId,
			null,
		);
	}

	// PUT
	putDenyCreditRequest(creditRequestId: number) {
		return this.httpClient.put<number>(
			environment.bankServiceApiUrl +
				ApiRoutes.credit.denyCreditRequest +
				'/' +
				creditRequestId,
			null,
		);
	}
}
