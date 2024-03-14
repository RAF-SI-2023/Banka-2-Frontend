import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {ApiRoutes} from "./api-routes";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PrivateClientDto} from "../dto/PrivateClientDto";
import {CorporateClientDto} from "../dto/CorporateClientDto";

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
    return this.http.post<boolean>(`${this.iAmApi}${this.accountUrls.associateProfileInit}`,
{
        accountNumber: accountNumber
      }
    );
  }

  postBasicInfoPrivateClient(client: PrivateClientDto) {
    return this.http.post<boolean>(`${this.bankApi}${this.usersUrls.privateClient}`, client);
  }

  postBasicInfoCorporateClient(client: CorporateClientDto) {
    return this.http.post<boolean>(`${this.bankApi}${this.usersUrls.corporateClient}`, client);
  }

  codeConfirmation() {
    return this.http.post<boolean>(`${this.iAmApi}${this.accountUrls.codeConfirmation}`, {});
  }

  passwordActivation(email: string, password: string) {
    return this.http.put<boolean>(`${this.iAmApi}${this.usersUrls.passwordActivation}/${email}`,
{
        password: password
      }
    );
  }
}
