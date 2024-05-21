import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ApiRoutes } from '../api-routes';
import { CompanyDto } from 'src/app/dtos/company-dto';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getFindAllCompanies() {
		return this.httpClient.get<CompanyDto[]>(
			environment.iamServiceApiUrl + ApiRoutes.company.findAll,
		);
	}

	getFindCompanyById(id: number) {
		return this.httpClient.get<CompanyDto>(
			environment.iamServiceApiUrl +
				ApiRoutes.company.findById +
				'/' +
				id,
		);
	}

	getFindCompanyByIdentificationNumber() {
		return this.httpClient.get<CompanyDto>(
			environment.iamServiceApiUrl +
				ApiRoutes.company.findByIdentificationNumber,
		);
	}

	getFindCompanyByPib() {
		return this.httpClient.get<CompanyDto>(
			environment.iamServiceApiUrl + ApiRoutes.company.findByPib,
		);
	}

	// POST
	postCreateCompany(company: CompanyDto) {
		return this.httpClient.post<CompanyDto>(
			environment.iamServiceApiUrl + ApiRoutes.company.createCompany,
			company,
		);
	}

	// PUT
	putUpdateCompany(company: CompanyDto) {
		return this.httpClient.put<CompanyDto>(
			environment.iamServiceApiUrl + ApiRoutes.company.updateCompany,
			company,
		);
	}

	// DELETE
	deleteCompanyById(id: number) {
		return this.httpClient.delete<CompanyDto[]>(
			environment.iamServiceApiUrl +
				ApiRoutes.company.deleteById +
				'/' +
				id,
		);
	}

	deleteCompanyByIdentificationNumber(identificationNumber: number) {
		return this.httpClient.delete<CompanyDto[]>(
			environment.iamServiceApiUrl +
				ApiRoutes.company.deleteByIdentificationNumber +
				`/${identificationNumber}`,
		);
	}
}
