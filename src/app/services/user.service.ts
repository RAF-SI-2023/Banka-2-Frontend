import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserDto } from '../dtos/user-dto';
import { PrivateClientDto } from '../dtos/private-client-dto';
import { CorporateClientDto } from '../dtos/corporate-client-dto';
import { environment } from 'src/environments/environment.development';
import { ApiRoutes } from './api-routes';
import { EmployeeDto } from '../dtos/employee-dto';
import { AuthCredentialsDto } from '../dtos/auth-credentials-dto';
import { passwordChangeTokenDto } from '../dtos/passwordChangeTokenDto';
import { passwordChangeTokenNewPasswordDto } from '../dtos/passwordChangeTokenNewPasswordDto';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  // GET metode
  getFindAll() {
    return this.httpClient.get<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.findAll);
  }

  getUserById() {
    const id = localStorage.getItem('id');
    return this.httpClient.get<UserDto | PrivateClientDto | CorporateClientDto>(environment.iAmServiceApiUrl + ApiRoutes.users.findById + '/' + id);
  }

  // PUT metode
  putActivateEmployee(id: number) {
    return this.httpClient.put<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.activateEmployee + `/${id}`, {});
  }

  putDeactivateEmployee(id: number) {
    return this.httpClient.put<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.deactivateEmployee + `/${id}`, {});
  }

  putUpdatePrivateClient(user: UserDto) {
    return this.httpClient.put<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.updatePrivateClient, user);
  }

  putUpdateCorporateClient(user: UserDto) {
    return this.httpClient.put<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.updateCorporateClient, user);
  }

  putUpdateEmployee(user: UserDto) {
    return this.httpClient.put<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.updateEmployee, user);
  }

  // POST metode
  changePasswordRequest (body: AuthCredentialsDto){
    return this.httpClient.post<passwordChangeTokenDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.changePasswordRequest , body);
  }
  changePasswordSubmit(paswordChangeToken:passwordChangeTokenNewPasswordDto){
    const urlToken = paswordChangeToken.passwordChangeTokenDto.token;
    return this.httpClient.post(environment.iAmServiceApiUrl + ApiRoutes.users.changePasswordSubmit + `/${urlToken}`, paswordChangeToken );
  }

  // POST metoda za dodavanje zaposlenog
  createEmployee(employee: EmployeeDto) {
    const userId = localStorage.getItem('id');
    return this.httpClient.post<EmployeeDto>(environment.iAmServiceApiUrl + ApiRoutes.users.createEmployee, employee);
  }

  // DELETE metode
  delete(email: string) {
    return this.httpClient.delete<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.delete + `/${email}`);
  }
}
