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
    const headers = this.authService.getHeaders();
    return this.httpClient.get<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.findAll, { headers });
  }

  // FIND BY ID
  getUserById() {
    const headers = this.authService.getHeaders();
    const userId = localStorage.getItem('id');
    return this.httpClient.get<UserDto | PrivateClientDto | CorporateClientDto>(environment.iAmServiceApiUrl + ApiRoutes.users.findById + '/' + userId, { headers });
  }

  // PUT metode
  // (url, null, headers) umesto (url, headers) jer je PUT request lose napisan na back-u, trebao je da bude GET
  putActivateEmployee(id: number) {
    const headers = this.authService.getHeaders();
    return this.httpClient.put<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.activateEmployee + `/${id}`, { headers });
  }

  // (url, null, headers) umesto (url, headers) jer je PUT request lose napisan na back-u, trebao je da bude GET
  putDeactivateEmployee(id: number) {
    const headers = this.authService.getHeaders();
    return this.httpClient.put<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.deactivateEmployee + `/${id}`, { headers });
  }

  putUpdatePrivateClient(user: UserDto) {
    const headers = this.authService.getHeaders();
    return this.httpClient.put<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.updatePrivateClient, user, { headers });
  }

  putUpdateCorporateClient(user: UserDto) {
    const headers = this.authService.getHeaders();
    return this.httpClient.put<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.updateCorporateClient, user, { headers });
  }

  putUpdateEmployee(user: UserDto) {
    const headers = this.authService.getHeaders();
    return this.httpClient.put<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.updateEmployee, user, { headers });
  }

  // POST metode

  // DELETE metode
  delete(email: string) {
    const headers = this.authService.getHeaders();
    return this.httpClient.delete<UserDto[]>(environment.iAmServiceApiUrl + ApiRoutes.users.delete + `/${email}` , { headers });
  }


  changePasswordRequest (currentPassword:string,newPassword:string){
    const headers = this.authService.getHeaders();
    const email = localStorage.getItem("email");
    console.log("ASDSADA "+environment.iAmServiceApiUrl + ApiRoutes.users.changePassword + `/${email}`);
    console.log("!!"+headers)
    return this.httpClient.post(environment.iAmServiceApiUrl + ApiRoutes.users.changePassword + `/${email}`,{ headers });
  }
  changePasswordSubmit(currentPassword:string,newPassword:string){
    const headers = this.authService.getHeaders();
    const email = localStorage.getItem("email");
    console.log("ASDSADA"+environment.iAmServiceApiUrl + ApiRoutes.users.changePasswordSubmit + `/${email}`);

     return this.httpClient.post(environment.iAmServiceApiUrl + ApiRoutes.users.changePassword + `/${email}`, { headers });
  }
}
