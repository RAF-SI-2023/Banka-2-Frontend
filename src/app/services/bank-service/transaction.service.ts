import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { SimpleTransactionDto } from 'src/app/dtos/simple-transaction-dto';
import { TransactionDto } from 'src/app/dtos/transaction-dto';
import { ApiRoutes } from '../api-routes';
import { InternalTransactionResponseDto } from 'src/app/dtos/internal-transaction-response-dto';
import { ExternalTransactionResponseDto } from 'src/app/dtos/external-transaction-response-dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private httpClient: HttpClient) {}
	
  ////////////////////////////////
	//TransferTransactionController
	///////////////////////////////
	
	//GET
	getAllTransactionsById(userId:number){
		return this.httpClient.get<TransactionDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.transferTransaction.findById}/${userId}`,
		);
	}
	//POST
	postTransactionExternal(transaction:SimpleTransactionDto){
		return this.httpClient.post<ExternalTransactionResponseDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.transferTransaction.createExternalTransaction}`,
			transaction,
		);
	}
	postTransactionInternal(transaction:SimpleTransactionDto){
		return this.httpClient.post<InternalTransactionResponseDto>(
			`${environment.bankServiceApiUrl}${ApiRoutes.transferTransaction.createInternalTransaction}`,
			transaction,
		);
	}
	//PATCH
	patchTransactionVerify(transactionId:number,verificationToken:string){
		return this.httpClient.patch(
			`${environment.bankServiceApiUrl}${ApiRoutes.transferTransaction.patchVerifyTransaction}/${transactionId}`,
			verificationToken
		);
	}
}
