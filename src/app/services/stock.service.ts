import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiRoutes } from './api-routes';
import { HttpClient } from '@angular/common/http';
import { StockDto } from '../dtos/stock-dto';

@Injectable({
	providedIn: 'root',
})
export class StockService {
	constructor(private httpClient: HttpClient) {}

	// StockController
	/// GET
	getFindAll() {
		return this.httpClient.get<StockDto[]>(
			environment.stockServiceApiUrl + ApiRoutes.stocks.findAll,
		);
	}

	getFindById(id: number) {
		return this.httpClient.get<StockDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.stocks.findById +
				'/' +
				id,
		);
	}

	getFindBySymbol(symbol: string) {
		return this.httpClient.get<StockDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.stocks.findBySymbol +
				'/' +
				symbol,
		);
	}
}
