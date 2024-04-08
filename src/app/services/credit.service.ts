import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StockDto} from "../dtos/stock-dto";
import {environment} from "../../environments/environment.development";
import {ApiRoutes} from "./api-routes";
import {CreditDto} from "../dtos/credit-dto";
import {CreateCreditRequestDto} from "../dtos/create-credit-request-dto";

@Injectable({
  providedIn: 'root'
})
export class CreditService {

	constructor(private httpClient: HttpClient) {}

	// StockController
	/// GET
	getFindAll(accountNumber: string) {
		return this.httpClient.get<CreditDto[]>(
			environment.bankServiceApiUrl + ApiRoutes.credits.findAll + '/' + accountNumber,
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

	postCreateCreditRequest(createCreditRequestDto: CreateCreditRequestDto) {
		return this.httpClient.post<CreateCreditRequestDto>(
			environment.bankServiceApiUrl + ApiRoutes.credits.createCreditRequest,
			createCreditRequestDto,
		);
	}
}
