import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiRoutes } from '../api-routes';
import { ForexDto } from '../../dtos/forex-dto';

@Injectable({
	providedIn: 'root',
})
export class ForexService {
	constructor(private httpClient: HttpClient) {}

	// GET
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
