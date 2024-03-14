import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {ApiRoutes} from "./api-routes";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PrivateClientDto} from "../dto/PrivateClientDto";
import {CorporateClientDto} from "../dto/CorporateClientDto";
import {PrivateClientRequestDto} from "../dto/private-client-request.dto";
import {CorporateClientRequestDto} from "../dto/corporate-client-request.dto";

@Injectable({
  providedIn: 'root'
})
export class BankProfileService {
  bankApi = environment.bankServiceApiUrl;
  iAmApi = environment.iAmServiceApiUrl;
  accountUrls = ApiRoutes.accounts;
  usersUrls = ApiRoutes.users;

  http = inject(HttpClient);
  router = inject(Router);
  constructor() { }

  associateProfileInitialization(accountNumber: string) {
    return this.http.post<boolean>(`${this.bankApi}${this.accountUrls.associateProfileInit}`,
{
        accountNumber: accountNumber
      }
    );
  }

  postBasicInfoPrivateClient(client: PrivateClientRequestDto) {
    return this.http.post<boolean>(`${this.bankApi}${this.usersUrls.privateClient}`, client);
  }

  postBasicInfoCorporateClient(client: CorporateClientRequestDto) {
    return this.http.post<boolean>(`${this.bankApi}${this.usersUrls.corporateClient}`, client);
  }

  codeConfirmation(code: string, accountNumber: string) {
    return this.http.post<boolean>(`${this.iAmApi}${this.accountUrls.codeConfirmation}/${accountNumber}`, code
    );
  }

  passwordActivation(email: string, password: string) {
    return this.http.put<boolean>(`${this.iAmApi}${this.usersUrls.passwordActivation}/${email}/password-activation`,
{
        password: password
      }
    );
  }
}
