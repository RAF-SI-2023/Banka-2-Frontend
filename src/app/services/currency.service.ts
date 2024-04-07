import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiRoutes } from './api-routes';
import { HttpClient } from '@angular/common/http';
import { CurrencyDto } from '../dtos/currency-dto';
import { CurrencyInflationDto } from '../dtos/currency-inflation-dto';

@Injectable({
	providedIn: 'root',
})
export class CurrencyService {
	constructor(private httpClient: HttpClient) {}

	// StockController
	/// GET
	getFindAll() {
		return this.httpClient.get<CurrencyDto[]>(
			environment.stockServiceApiUrl + ApiRoutes.currency.findAll,
		);
	}

	getFindById(id: number) {
		return this.httpClient.get<CurrencyDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.currency.findById +
				'/' +
				id,
		);
	}

	getFindByCurrencyCode(currencyCode: string) {
		return this.httpClient.get<CurrencyDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.currency.findByCode +
				'/' +
				currencyCode,
		);
	}

	getFindInflationByCurrencyId(currencyId: number) {
		return this.httpClient.get<CurrencyInflationDto[]>(
			environment.stockServiceApiUrl +
				ApiRoutes.currency.findInflationByCurrencyId +
				'/' +
				currencyId,
		);
	}

	// TODO: pogledati api-routes.ts komentar
	getFindInflationByCurrencyIdAndYear(currencyId: number, year: number) {
		return this.httpClient.get<CurrencyInflationDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.currency.findInflationByCurrencyIdAndYear +
				'/' +
				currencyId +
				'/' +
				year,
		);
	}
}
