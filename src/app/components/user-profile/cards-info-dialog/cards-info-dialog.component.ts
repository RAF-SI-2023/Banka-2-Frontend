import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CardService } from 'src/app/services/bank-service/card.service';
import { AccountDto } from 'src/app/dtos/account-dto';
import { CardDto } from 'src/app/dtos/card-dto';

@Component({
	selector: 'app-cards-info-dialog',
	templateUrl: './cards-info-dialog.component.html',
	styleUrls: ['./cards-info-dialog.component.css'],
})
export class CardsInfoDialogComponent {
	@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
	@ViewChild(MatSort) sort: MatSort | undefined;
	displayedColumns: string[] = [
		'identificationCardNumber',
		'cardType',
		'nameOfCard',
		'creationDate',
		'expirationDate',
		'cvvCode',
		'limitCard',
		'status',
		'block',
	];
	dataSource = new MatTableDataSource<CardDto>();
	newSelectedRow: AccountDto = { ...this.data.selectedAccount };
	cardRow: CardDto | null = null;
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private cardService: CardService,
	) {
		this.fetchCards();
	}

	selectRow(row: CardDto): void {
		if (
			this.cardRow?.identificationCardNumber !=
			row.identificationCardNumber
		) {
			this.cardRow = row;
		}
	}

	fetchCards(): void {
		this.cardService
			.getCardsByAccountNumber(this.newSelectedRow.accountNumber)
			.pipe(
				map(dataSource => {
					console.log(dataSource);
					this.dataSource.data = dataSource;
					return dataSource;
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	blockCard(card: CardDto) {
		// console.log(this.cardRow?.identificationCardNumber);
		this.cardService
			.putChangeCardBlock(card.identificationCardNumber)
			.pipe(
				map(_ => {
					this.fetchCards();
				}),
				catchError(error => {
					return throwError(() => error);
				}),
			)
			.subscribe();
	}
}
