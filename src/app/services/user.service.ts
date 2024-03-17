import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/UserDto';
import { PrivateClientDto } from '../dto/PrivateClientDto';
import { CorporateClientDto } from '../dto/CorporateClientDto';
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

  // FIND BY ID
  getUserById() {
    const userId = localStorage.getItem('id');
    return this.httpClient.get<UserDto | PrivateClientDto | CorporateClientDto>(environment.iAmServiceApiUrl + ApiRoutes.users.findById + '/' + userId);
  }

  // PUT metode
  // (url, null, headers) umesto (url, headers) jer je PUT request lose napisan na back-u, trebao je da bude GET
  putActivateEmployee(id: number) {
    // const headers = this.authService.getHeaders();
    return this.httpClient.put<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.activateEmployee + `/${id}`, {});
  }

  // (url, null, headers) umesto (url, headers) jer je PUT request lose napisan na back-u, trebao je da bude GET
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

  // DELETE metode
  delete(email: string) {
    return this.httpClient.delete<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.delete + `/${email}`);
  }


  changePasswordRequest (currentPassword:string,newPassword:string){
    const email = localStorage.getItem("email");
    return this.httpClient.post(environment.iAmServiceApiUrl + ApiRoutes.users.changePassword + `/${email}`,{});
  }
  changePasswordSubmit(currentPassword:string,newPassword:string){
    const email = localStorage.getItem("email");
    return this.httpClient.post(environment.iAmServiceApiUrl + ApiRoutes.users.changePassword + `/${email}`, {});
  }
}
