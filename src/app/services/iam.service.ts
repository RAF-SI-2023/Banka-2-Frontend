import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ApiRoutes } from './api-routes';
import { UserDto } from '../dtos/user-dto';
import { PrivateClientDto } from '../dtos/private-client-dto';
import { CorporateClientDto } from '../dtos/corporate-client-dto';
import { PrivateClientRequestDto } from '../dtos/private-client-request.dto';
import { CorporateClientRequestDto } from '../dtos/corporate-client-request-dto';
import { EmployeeDto } from '../dtos/employee-dto';
import { AgentDto } from '../dtos/agent-dto';
import { CompanyDto } from '../dtos/company-dto';
import { AuthCredentialsDto } from '../dtos/auth-credentials-dto';
import { PasswordChangeTokenDto } from '../dtos/password-change-token-dto';

@Injectable({
	providedIn: 'root',
})
export class IamService {
	constructor(private httpClient: HttpClient) { }

	// UserController
	/// GET
	getFindAll() {
		return this.httpClient.get<UserDto[]>(
			environment.iamServiceApiUrl + ApiRoutes.users.findAll,
		);
	}

	getFindById(id: number) {
		return this.httpClient.get<
			UserDto | PrivateClientDto | CorporateClientDto
		>(environment.iamServiceApiUrl + ApiRoutes.users.findById + '/' + id);
	}

	resetAgentsLeftLimit(id: number) {
		return this.httpClient.patch<void>(
			environment.iamServiceApiUrl + ApiRoutes.users.resetAgentsLeftLimit + '/' + id,
			{},
			{ responseType: 'json' }
		);
	}

	getAgentsLeftLimit(id: number) {
		return this.httpClient.get<number>(
			environment.iamServiceApiUrl + ApiRoutes.users.getAgentsLeftLimit + '/' + id,
		);
	}

	/// POST
	postPasswordActivation(email: string, password: string) {
		return this.httpClient.post<boolean>(
			`${environment.iamServiceApiUrl}${ApiRoutes.users.passwordActivation}/${email}`,
			{
				password: password,
			},
		);
	}

	postPasswordChange(body: AuthCredentialsDto) {
		return this.httpClient.post<PasswordChangeTokenDto[]>(
			environment.iamServiceApiUrl + ApiRoutes.users.passwordChange,
			body,
		);
	}

	postCreateEmployee(employee: EmployeeDto) {
		return this.httpClient.post<EmployeeDto>(
			environment.iamServiceApiUrl + ApiRoutes.users.createEmployee,
			employee,
		);
	}

	postCreatePrivateClient(client: PrivateClientRequestDto) {
		return this.httpClient.post<boolean>(
			`${environment.iamServiceApiUrl}${ApiRoutes.users.createPrivateClient}`,
			client,
		);
	}

	postCreateCorporateClient(client: CorporateClientRequestDto) {
		return this.httpClient.post<boolean>(
			`${environment.iamServiceApiUrl}${ApiRoutes.users.createCorporateClient}`,
			client,
		);
	}

	postCreateAgent(agentDto: AgentDto) {
		return this.httpClient.post<AgentDto>(
			`${environment.iamServiceApiUrl}${ApiRoutes.users.createAgent}`,
			agentDto
		);

	}

	/// PUT
	putUpdateEmployee(user: UserDto) {
		return this.httpClient.put<UserDto[]>(
			environment.iamServiceApiUrl + ApiRoutes.users.updateEmployee,
			user,
		);
	}

	putUpdatePrivateClient(user: UserDto) {
		return this.httpClient.put<UserDto[]>(
			environment.iamServiceApiUrl + ApiRoutes.users.updatePrivateClient,
			user,
		);
	}

	putUpdateCorporateClient(user: UserDto) {
		return this.httpClient.put<UserDto[]>(
			environment.iamServiceApiUrl +
			ApiRoutes.users.updateCorporateClient,
			user,
		);
	}

	putActivateEmployee(id: number) {
		return this.httpClient.put<UserDto[]>(
			environment.iamServiceApiUrl +
			ApiRoutes.users.activateEmployee +
			`/${id}`,
			{},
		);
	}

	putDeactivateEmployee(id: number) {
		return this.httpClient.put<UserDto[]>(
			environment.iamServiceApiUrl +
			ApiRoutes.users.deactivateEmployee +
			`/${id}`,
			{},
		);
	}

	// DELETE
	delete(email: string) {
		return this.httpClient.delete<UserDto[]>(
			environment.iamServiceApiUrl + ApiRoutes.users.delete + `/${email}`,
		);
	}

	// CompanyController
	/// GET
	getFindAllCompanies() {
		return this.httpClient.get<CompanyDto[]>(
			environment.iamServiceApiUrl + ApiRoutes.companies.findAll,
		);
	}

	getFindCompanyById(id: number) {
		return this.httpClient.get<CompanyDto>(
			environment.iamServiceApiUrl + ApiRoutes.companies.findById + '/' + id,
		);
	}

	getFindCompanyByIdentificationNumber() {
		return this.httpClient.get<CompanyDto>(
			environment.iamServiceApiUrl + ApiRoutes.companies.findByIdentificationNumber,
		);
	}

	getFindCompanyByPib() {
		return this.httpClient.get<CompanyDto>(
			environment.iamServiceApiUrl + ApiRoutes.companies.findByPib,
		);
	}

	///POST
	postCreateCompany(company: CompanyDto) {
		return this.httpClient.post<CompanyDto>(
			environment.iamServiceApiUrl + ApiRoutes.companies.createCompany,
			company,
		);
	}

	///PUT
	putUpdateCompany(company: CompanyDto) {
		return this.httpClient.put<CompanyDto>(
			environment.iamServiceApiUrl +
			ApiRoutes.companies.updateCompany,
			company,
		);
	}

	///DELETE
	deleteCompanyById(id: number) {
		this.httpClient.delete(
			environment.iamServiceApiUrl + ApiRoutes.companies.deleteById + `/${id}`,
		);
	}

	deleteCompanyByIdentificationNumber(identificationNumber: any) {
		this.httpClient.delete(
			environment.iamServiceApiUrl + ApiRoutes.companies.deleteByIdentificationNumber + `/${identificationNumber}`,
		);
	}
}
