import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { BankProfitService } from 'src/app/services/bank-service/bank-profit.service';
import { BankProfitDto } from 'src/app/dtos/bank-profit-dto';
import { ActionAgentProfitService } from 'src/app/services/bank-service/action-agent-profit.service';
import { TotalActionAgentProfitDto } from 'src/app/dtos/total-action-agent-profit-dto';
import { BankTransferTransactionDetailsService } from 'src/app/services/bank-service/bank-transfer-transaction-details.service';

@Component({
	selector: 'app-bank-profits',
	templateUrl: './bank-profits.component.html',
	styleUrls: ['./bank-profits.component.css'],
})
export class BankProfitsComponent {
	constructor(
		private router: Router,
		private bankProfitService: BankProfitService,
		private actionAgentProfitService: ActionAgentProfitService,
		private bankTransferTransactionDetailsService: BankTransferTransactionDetailsService,
	) {
		this.getBankTotalProfit();
		this.getAgentTotalProfit();
		this.getBankTransactionsTotalProfit();
	}

	bankTotalProfit: BankProfitDto | null = null;
	agentTotalProfit = 0;
	bankTransactionsTotalProfit = 0;

	getBankTotalProfit() {
		this.bankProfitService
			.getAll()
			.pipe(
				map(Response => {
					this.bankTotalProfit = Response;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	getAgentTotalProfit() {
		this.actionAgentProfitService
			.getAgentsTotalProfit()
			.pipe(
				map(Response => {
					this.agentTotalProfit = Response;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	getBankTransactionsTotalProfit() {
		this.bankTransferTransactionDetailsService
			.getTotalProfit()
			.pipe(
				map(Response => {
					this.bankTransactionsTotalProfit = Response;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	redirectToAgentProfits() {
		this.router.navigate(['/bank-profits/agent-profits']);
	}

	redirectToBankTransactionsProfits() {
		this.router.navigate(['/bank-profits/bank-transactions-profits']);
	}
}
