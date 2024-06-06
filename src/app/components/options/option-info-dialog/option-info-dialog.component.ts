import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { digitValidator } from 'src/app/utils/validators/digit.validator';
import { OrderDto } from 'src/app/dtos/order-dto';
import { OrderService } from 'src/app/services/bank-service/order.service';
import { ExchangeService } from 'src/app/services/stock-service/exchange.service';
import { StockService } from 'src/app/services/stock-service/stock.service';
import { catchError, map, throwError } from 'rxjs';

@Component({
	selector: 'app-option-info-dialog',
	templateUrl: './option-info-dialog.component.html',
	styleUrls: ['./option-info-dialog.component.css'],
})
export class OptionInfoDialogComponent {
	form: FormGroup;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private orderService: OrderService,
		private stockService: StockService,
		private exchangeService: ExchangeService,
	) {
		this.form = this.fb.group({
			quantity: [null, [Validators.required, digitValidator()]],
			allOrNone: [false],
		});
	}

	createOrder() {
		const orderDto = this.form.value as unknown as OrderDto;

		orderDto.orderActionType = 'BUY';
		orderDto.listingType = 'OPTION';
		orderDto.securitiesSymbol =
			this.data.stockListing +
			'|' +
			this.data.optionType +
			'|' +
			this.data.strikePrice +
			'|' +
			this.data.settlementDate +
			'|' +
			'EUR';
		orderDto.limitPrice = String(-1);
		orderDto.stopPrice = String(-1);
		orderDto.margin = false;

		this.orderService.postCreateOrder(orderDto).subscribe({
			next: response => {
				console.log(response);
			},
			error: error => {
				console.error(error);
			},
		});
	}
}
