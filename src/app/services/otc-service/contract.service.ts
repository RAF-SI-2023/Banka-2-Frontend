import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ApiRoutes } from '../api-routes';
import { ContractDto } from 'src/app/dtos/contract-dto';

@Injectable({
	providedIn: 'root',
})
export class ContractService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getAllContracts() {
		return this.httpClient.get<ContractDto[]>(
			`${environment.otcServiceApiUrl}${ApiRoutes.contract.getAllContracts}`,
		);
	}

	getAllWaitingContracts() {
		return this.httpClient.get<ContractDto[]>(
			`${environment.otcServiceApiUrl}${ApiRoutes.contract.getAllWaitingContracts}`,
		);
	}

	getContractById(contractId: number) {
		return this.httpClient.get<ContractDto[]>(
			`${environment.otcServiceApiUrl}${ApiRoutes.contract.getContractById}/${contractId}`,
		);
	}

	// POST
	postCreateContract(contractDto: ContractDto) {
		return this.httpClient.post<ContractDto>(
			environment.otcServiceApiUrl + ApiRoutes.contract.createContract,
			contractDto,
		);
	}

	// PUT
	putSellerApproveContractById(contractId: number) {
		return this.httpClient.put<number>(
			environment.otcServiceApiUrl +
				ApiRoutes.contract.sellerApproveContractById +
				'/' +
				contractId,
			null,
		);
	}

	putBankApproveContractById(contractId: number) {
		return this.httpClient.put<number>(
			environment.otcServiceApiUrl +
				ApiRoutes.contract.bankApproveContractById +
				'/' +
				contractId,
			null,
		);
	}

	putSellerDenyContractById(contractId: number, message: string) {
		return this.httpClient.put<number>(
			environment.otcServiceApiUrl +
				ApiRoutes.contract.sellerDenyContractById +
				'/' +
				contractId,
			message,
		);
	}

	putBankDenyContractById(contractId: number, message: string) {
		return this.httpClient.put<number>(
			environment.otcServiceApiUrl +
				ApiRoutes.contract.bankDenyContractById +
				'/' +
				contractId,
			message,
		);
	}
}
