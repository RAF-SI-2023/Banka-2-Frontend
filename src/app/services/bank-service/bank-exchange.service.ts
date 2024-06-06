import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiRoutes } from '../api-routes';
import { ExchangeRatesDto } from 'src/app/dtos/exchange-rates-dto';
import { ExchangeRequestDto } from 'src/app/dtos/exchange-request-dto';

@Injectable({
	providedIn: 'root',
})
export class BankExchangeService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getAllExchangeRates(fromCurrency: string) {
		return this.httpClient.get<ExchangeRatesDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.bankCurrencyExchange.getAllExchangeRates}/${fromCurrency}`,
		);
	}

	// POST
	postExchangeCurrency(exchangeRequestDto: ExchangeRequestDto) {
		return this.httpClient.post<boolean>(
			`${environment.bankServiceApiUrl}${ApiRoutes.bankCurrencyExchange.postExchangeCurrency}`,
			exchangeRequestDto,
		);
	}
}
