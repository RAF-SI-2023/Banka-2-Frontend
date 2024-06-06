import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiRoutes } from '../api-routes';
import { FuturesContractDto } from 'src/app/dtos/futures-contract-dto';

@Injectable({
	providedIn: 'root',
})
export class FuturesContractService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getFindAllFutures() {
		return this.httpClient.get<FuturesContractDto[]>(
			environment.stockServiceApiUrl + ApiRoutes.futuresContract.findAll,
		);
	}

	getFindByIdFutures(id: number) {
		return this.httpClient.get<FuturesContractDto>(
			environment.stockServiceApiUrl +
				ApiRoutes.futuresContract.findById +
				'/' +
				id,
		);
	}
}
