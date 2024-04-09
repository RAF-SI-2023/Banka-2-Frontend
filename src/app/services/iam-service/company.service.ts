import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyDto } from 'src/app/dtos/company-dto';
import { environment } from 'src/environments/environment.development';
import { ApiRoutes } from '../api-routes';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getFindAllCompanies() {
		return this.httpClient.get<CompanyDto[]>(
			environment.iamServiceApiUrl + ApiRoutes.companies.findAll,
		);
	}

	getFindCompanyById(id: number) {
		return this.httpClient.get<CompanyDto>(
			environment.iamServiceApiUrl +
				ApiRoutes.companies.findById +
				'/' +
				id,
		);
	}

	getFindCompanyByIdentificationNumber() {
		return this.httpClient.get<CompanyDto>(
			environment.iamServiceApiUrl +
				ApiRoutes.companies.findByIdentificationNumber,
		);
	}

	getFindCompanyByPib() {
		return this.httpClient.get<CompanyDto>(
			environment.iamServiceApiUrl + ApiRoutes.companies.findByPib,
		);
	}

	// POST
	postCreateCompany(company: CompanyDto) {
		return this.httpClient.post<CompanyDto>(
			environment.iamServiceApiUrl + ApiRoutes.companies.createCompany,
			company,
		);
	}

	// PUT
	putUpdateCompany(company: CompanyDto) {
		return this.httpClient.put<CompanyDto>(
			environment.iamServiceApiUrl + ApiRoutes.companies.updateCompany,
			company,
		);
	}

	// DELETE
	deleteCompanyById(id: number) {
		return this.httpClient.delete<CompanyDto[]>(
			environment.iamServiceApiUrl +
				ApiRoutes.companies.deleteById +
				'/' +
				id,
		);
	}

	deleteCompanyByIdentificationNumber(identificationNumber: any) {
		return this.httpClient.delete<CompanyDto[]>(
			environment.iamServiceApiUrl +
				ApiRoutes.companies.deleteByIdentificationNumber +
				`/${identificationNumber}`,
		);
	}
}
