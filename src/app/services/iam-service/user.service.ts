import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ApiRoutes } from '../api-routes';
import { UserDto } from '../../dtos/user-dto';
import { PrivateClientDto } from '../../dtos/private-client-dto';
import { CorporateClientDto } from '../../dtos/corporate-client-dto';
import { PrivateClientRequestDto } from '../../dtos/private-client-request.dto';
import { CorporateClientRequestDto } from '../../dtos/corporate-client-request-dto';
import { EmployeeDto } from '../../dtos/employee-dto';
import { AgentDto } from '../../dtos/agent-dto';
import { AuthCredentialsDto } from '../../dtos/auth-credentials-dto';
import { PasswordChangeTokenDto } from '../../dtos/password-change-token-dto';
import { CompanyEmployeeDto } from 'src/app/dtos/company-employee-dto';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private httpClient: HttpClient) {}

	// GET
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

	// PATCH
	patchResetAgentsLeftLimit(id: number) {
		return this.httpClient.patch<null>(
			environment.iamServiceApiUrl +
				ApiRoutes.users.resetAgentsLeftLimit +
				'/' +
				id,
			{},
		);
	}

	// POST
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

	postCreateCompanyEmployee(client: CompanyEmployeeDto) {
		return this.httpClient.post<boolean>(
			`${environment.iamServiceApiUrl}${ApiRoutes.users.createCompanyEmployee}`,
			client,
		);
	}

	postCreateAgent(agentDto: AgentDto) {
		return this.httpClient.post<AgentDto>(
			`${environment.iamServiceApiUrl}${ApiRoutes.users.createAgent}`,
			agentDto,
		);
	}

	// PUT
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
}
