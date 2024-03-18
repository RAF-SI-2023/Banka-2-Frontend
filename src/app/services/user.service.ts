import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserDto } from '../dtos/user-dto';
import { PrivateClientDto } from '../dtos/private-client-dto';
import { CorporateClientDto } from '../dtos/corporate-client-dto';
import { environment } from 'src/environments/environment.development';
import { ApiRoutes } from './api-routes';

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
  changePasswordRequest(currentPassword: string, newPassword: string) {
    const email = localStorage.getItem("email");
    return this.httpClient.post(environment.iAmServiceApiUrl + ApiRoutes.users.changePassword + `/${email}`, {});
  }
  changePasswordSubmit(currentPassword: string, newPassword: string) {
    const email = localStorage.getItem("email");
    return this.httpClient.post(environment.iAmServiceApiUrl + ApiRoutes.users.changePassword + `/${email}`, {});
  }

  // DELETE metode
  delete(email: string) {
    return this.httpClient.delete<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.delete + `/${email}`);
  }
}
