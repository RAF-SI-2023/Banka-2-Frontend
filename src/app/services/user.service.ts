import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/UserDto';
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
    return this.httpClient.get<UserDto[]>(environment.apiUrl + ApiRoutes.users.findAll, { headers });
  }

  // DELETE metode
  delete(email: string) {
    const headers = this.authService.getHeaders();
    return this.httpClient.delete<UserDto[]>(environment.apiUrl + ApiRoutes.users.delete + `/${email}`, { headers });
  }
}
