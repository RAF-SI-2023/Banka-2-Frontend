import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiRoutes } from '../api-routes';
import { BankOtcStockDto } from '../../dtos/bank-otc-stock-dto';

@Injectable({
  providedIn: 'root'
})
export class InterbankTradableSecuritiesService {

  constructor(private httpClient: HttpClient) {}

  // GET
	getBanksStocks() {
		return this.httpClient.get<BankOtcStockDto[]>(
			environment.otcServiceApiUrl + ApiRoutes.bankOtc.getBanksStocks,
		);
	}

}
