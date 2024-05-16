import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityDto } from 'src/app/dtos/security-dto';
import { environment } from 'src/environments/environment.development';
import { ApiRoutes } from '../api-routes';

@Injectable({
  providedIn: 'root'
})
export class SecuritiesService {

  constructor(private httpClient: HttpClient) { }

  getAllSecuritiesByAccountNumber(accountNumber: string){
    return this.httpClient.get<SecurityDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.securities.findAllByAccountNumber}/${accountNumber}`,
		);
  }
  getAllPublicSecurities(){
    return this.httpClient.get<SecurityDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.securities.findAllPublic}`,
		);
  }
  getSecurityBySymbol(symbol: string){
    return this.httpClient.get<SecurityDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.securities.findBySecuritySymbol}/${symbol}`,
		);
  }
  putSecurity(security: SecurityDto){
    return this.httpClient.put<SecurityDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.securities.updateSecurity}`,security
		);
  }
}
