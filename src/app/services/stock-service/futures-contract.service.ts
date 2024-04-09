import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ApiRoutes } from '../api-routes';

@Injectable({
	providedIn: 'root',
})
export class FuturesContractService {
	constructor(private httpClient: HttpClient) {}
}
