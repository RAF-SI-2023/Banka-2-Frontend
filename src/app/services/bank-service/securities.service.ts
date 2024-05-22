import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityDto } from 'src/app/dtos/security-dto';
import { environment } from 'src/environments/environment.development';
import { ApiRoutes } from '../api-routes';

@Injectable({
	providedIn: 'root',
})
export class SecuritiesService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getAllSecuritiesByAccountNumber(accountNumber: string) {
		return this.httpClient.get<SecurityDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.securities.findAllByAccountNumber}/${accountNumber}`,
		);
	}

	getAllOwnedSecurities() {
		return this.httpClient.get<SecurityDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.securities.findAll}`,
		);
	}

	getAllPrivatelyOwnedSecurities() {
		return this.httpClient.get<SecurityDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.securities.findAllPrivate}`,
		);
	}

	getAllCompanyOwnedSecurities() {
		return this.httpClient.get<SecurityDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.securities.findAllCompanies}`,
		);
	}

	getSecurityBySymbol(symbol: string) {
		return this.httpClient.get<SecurityDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.securities.findBySecuritySymbol}/${symbol}`,
		);
	}

	// PUT
	putSecurity(securityDto: SecurityDto) {
		return this.httpClient.put<SecurityDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.securities.updateSecurity}`,
			securityDto,
		);
	}
}
