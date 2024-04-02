import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiRoutes } from './api-routes';
import { HttpClient } from '@angular/common/http';
import { StockDto } from '../dtos/stock-dto';
import { ForexDto } from '../dtos/forex-dto';

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
	// ForexController
	/// GET
	getFindAllForex() {
		return this.httpClient.get<ForexDto[]>(
			environment.stockServiceApiUrl + ApiRoutes.forex.findAll,
		);
	}

	getFindByIdForex(id: number) {
		return this.httpClient.get<ForexDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.forex.findById +
				'/' +
				id,
		);
	}

	getFindByBaseCurrencyForex(baseCurrency: string) {
		return this.httpClient.get<ForexDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.forex.findByBaseCurrency +
				'/' +
				baseCurrency,
		);
	}

	getFindByQuoteCurrencyForex(quoteCurrency: string) {
		return this.httpClient.get<ForexDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.forex.findByQuoteCurrency +
				'/' +
				quoteCurrency,
		);
	}
}
