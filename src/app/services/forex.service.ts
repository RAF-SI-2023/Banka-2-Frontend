import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiRoutes } from './api-routes';
import { HttpClient } from '@angular/common/http';
import { ForexDto } from '../dtos/forex-dto';

@Injectable({
	providedIn: 'root',
})
export class ForexService {
	constructor(private httpClient: HttpClient) {}

	// ForexController
	/// GET
	getFindAll() {
		return this.httpClient.get<ForexDto[]>(
			environment.forexServiceApiUrl + ApiRoutes.forex.findAll,
		);
	}

	getFindById(id: number) {
		return this.httpClient.get<ForexDto>(
			environment.forexServiceApiUrl +
				ApiRoutes.forex.findById +
				'/' +
				id,
		);
	}

	getFindByBaseCurrency(baseCurrency: string) {
		return this.httpClient.get<ForexDto>(
			environment.forexServiceApiUrl +
				ApiRoutes.forex.findByBaseCurrency +
				'/' +
				baseCurrency,
		);
	}

	getFindByQuoteCurrency(quoteCurrency: string) {
		return this.httpClient.get<ForexDto>(
			environment.forexServiceApiUrl +
				ApiRoutes.forex.findByQuoteCurrency +
				'/' +
				quoteCurrency,
		);
	}
}
