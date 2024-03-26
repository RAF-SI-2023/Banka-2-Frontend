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
import { AuthCredentialsDto } from '../dtos/auth-credentials-dto';
import { passwordChangeTokenDto } from '../dtos/password-change-token-dto';
import { passwordChangeTokenNewPasswordDto } from '../dtos/password-change-token-new-password-dto';

@Injectable({
	providedIn: 'root',
})
export class IamService {
	constructor(private httpClient: HttpClient) {}

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

	/// POST
	postActivateClient(email: string, password: string) {
		return this.httpClient.post<boolean>(
			`${environment.iamServiceApiUrl}${ApiRoutes.users.passwordActivation}/${email}/password-activation`,
			{
				password: password,
			},
		);
	}

	postChangePasswordRequest(body: AuthCredentialsDto) {
		return this.httpClient.post<passwordChangeTokenDto[]>(
			environment.iamServiceApiUrl + ApiRoutes.users.passwordChangeInit,
			body,
		);
	}

	postChangePasswordSubmit(
		paswordChangeToken: passwordChangeTokenNewPasswordDto,
	) {
		const urlToken = paswordChangeToken.passwordChangeTokenDto.token;
		return this.httpClient.post(
			environment.iamServiceApiUrl +
				ApiRoutes.users.passwordChangeConf +
				`/${urlToken}`,
			paswordChangeToken,
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
}
