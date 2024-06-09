import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiRoutes } from '../api-routes';
import { OptionsDto } from 'src/app/dtos/options-dto';

@Injectable({
	providedIn: 'root',
})
export class OptionService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getFindAllOptionsByStockListing(stockListing: string) {
		return this.httpClient.get<OptionsDto[]>(
			environment.stockServiceApiUrl +
				ApiRoutes.options.findAllOptionsByStockListing +
				'/' +
				stockListing,
		);
	}
}
