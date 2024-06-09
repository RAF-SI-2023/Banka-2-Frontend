import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiRoutes } from '../api-routes';
import { ActionAgentProfitDto } from 'src/app/dtos/action-agent-profit-dto';
import { TotalActionAgentProfitDto } from 'src/app/dtos/total-action-agent-profit-dto';

@Injectable({
	providedIn: 'root',
})
export class ActionAgentProfitService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getAll() {
		return this.httpClient.get<ActionAgentProfitDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.actionAgentProfit.getAll}`,
		);
	}

	getAllTotalProfitsByEmail() {
		return this.httpClient.get<TotalActionAgentProfitDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.actionAgentProfit.getAllTotalProfitsByEmail}`,
		);
	}

	getAgentsTotalProfit() {
		return this.httpClient.get<number>(
			`${environment.bankServiceApiUrl}${ApiRoutes.actionAgentProfit.getAgentsTotalProfit}`,
		);
	}
}
