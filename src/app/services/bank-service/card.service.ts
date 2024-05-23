import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ApiRoutes } from '../api-routes';
import { CardDto } from 'src/app/dtos/card-dto';

@Injectable({
	providedIn: 'root',
})
export class CardService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getCardsByIdentificationCardNumber(identificationCardNumber: number) {
		return this.httpClient.get<CardDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.card.getCardsByIdentificationCardNumber}/${identificationCardNumber}`,
		);
	}

	getCardsByAccountNumber(accountNumber: string) {
		return this.httpClient.get<CardDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.card.getCardsByAccountNumber}/${accountNumber}`,
		);
	}

	// POST
	postCreateCard(cardDto: CardDto) {
		return this.httpClient.post<CardDto>(
			environment.bankServiceApiUrl + ApiRoutes.card.createCard,
			cardDto,
		);
	}

	// PUT
	putChangeCardStatus(identificationCardNumber: number) {
		return this.httpClient.put<number>(
			environment.bankServiceApiUrl +
				ApiRoutes.card.changeCardStatus +
				'/' +
				identificationCardNumber,
			null,
		);
	}

	putChangeCardLimit(cardDto: CardDto) {
		return this.httpClient.put<number>(
			environment.bankServiceApiUrl + ApiRoutes.card.changeCardLimit,
			cardDto,
		);
	}
}
