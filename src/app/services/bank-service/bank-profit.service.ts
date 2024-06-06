import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ApiRoutes } from '../api-routes';
import { BankProfitDto } from 'src/app/dtos/bank-profit-dto';

@Injectable({
	providedIn: 'root',
})
export class BankProfitService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getAll() {
		return this.httpClient.get<BankProfitDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.bankProfit.getAll}`,
		);
	}
}
