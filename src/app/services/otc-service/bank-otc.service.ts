import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiRoutes } from '../api-routes';
import { BankOtcStockDto } from '../../dtos/bank-otc-stock-dto';
import { OfferDto } from 'src/app/dtos/offer-dto';
import { MyOfferDto } from 'src/app/dtos/my-offer-dto';
import { FrontendOfferDto } from 'src/app/dtos/frontend-offer-dto';

@Injectable({
	providedIn: 'root',
})
export class BankOtcService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getBanksStocks() {
		return this.httpClient.get<BankOtcStockDto[]>(
			environment.otcServiceApiUrl + ApiRoutes.bankOtc.getBanksStocks,
		);
	}

	getOffers() {
		return this.httpClient.get<OfferDto[]>(
			environment.otcServiceApiUrl + ApiRoutes.bankOtc.getOffers,
		);
	}

	getOurOffers() {
		return this.httpClient.get<MyOfferDto[]>(
			environment.otcServiceApiUrl + ApiRoutes.bankOtc.getOurOffers,
		);
	}

	// POST
	postMakeOffer(frontendOfferDto: FrontendOfferDto) {
		return this.httpClient.post<FrontendOfferDto>(
			environment.otcServiceApiUrl + ApiRoutes.bankOtc.postMakeOffer,
			frontendOfferDto,
		);
	}

	postAcceptOffer(id: number) {
		return this.httpClient.post<OfferDto>(
			environment.otcServiceApiUrl +
				ApiRoutes.bankOtc.postAcceptOffer +
				'/' +
				id,
			null,
		);
	}

	postDeclineOffer(id: number) {
		return this.httpClient.post<OfferDto>(
			environment.otcServiceApiUrl +
				ApiRoutes.bankOtc.postDeclineOffer +
				'/' +
				id,
			null,
		);
	}

	// PUT
	putRefresh() {
		return this.httpClient.put<OfferDto>(
			environment.otcServiceApiUrl + ApiRoutes.bankOtc.putRefresh,
			null,
		);
	}

	// DELETE
	deleteMyOffer(id: number) {
		return this.httpClient.delete<boolean>(
			environment.otcServiceApiUrl +
				ApiRoutes.bankOtc.deleteMyOffer +
				'/' +
				id,
		);
	}

	deleteOffer(id: number) {
		return this.httpClient.delete<boolean>(
			environment.otcServiceApiUrl +
				ApiRoutes.bankOtc.deleteOffer +
				'/' +
				id,
		);
	}
}
