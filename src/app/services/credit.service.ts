import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StockDto} from "../dtos/stock-dto";
import {environment} from "../../environments/environment.development";
import {ApiRoutes} from "./api-routes";
import {CreditDto} from "../dtos/credit-dto";

@Injectable({
  providedIn: 'root'
})
export class CreditService {

	constructor(private httpClient: HttpClient) {}

	// StockController
	/// GET
	getFindAll() {
		return this.httpClient.get<CreditDto[]>(
			environment.stockServiceApiUrl + ApiRoutes.credits.findAll,
		);
	}

		getFindByCreditNumber(creditNumber: number) {
		return this.httpClient.get<CreditDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.credits.findByCreditNumber +
				'/' +
				creditNumber,
		);
	}}
