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
	getFindAllStocks() {
		return this.httpClient.get<StockDto[]>(
			environment.stockServiceApiUrl + ApiRoutes.stocks.findAllStocks,
		);
	}

	getFindStockById(id: number) {
		return this.httpClient.get<StockDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.stocks.findStockById +
				'/' +
				id,
		);
	}

	getFindStockBySymbol(symbol: string) {
		return this.httpClient.get<StockDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.stocks.findStockBySymbol +
				'/' +
				symbol,
		);
	}
}
