import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { digitValidator } from 'src/app/utils/validators/digit.validator';
import { OrderDto } from 'src/app/dtos/order-dto';
import { OrderService } from 'src/app/services/bank-service/order.service';
import { ExchangeService } from 'src/app/services/stock-service/exchange.service';
import { StockService } from 'src/app/services/stock-service/stock.service';
import { catchError, map, of } from 'rxjs';

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

	getCurrency(): Promise<string> {
		return new Promise(resolve => {
			this.stockService
				.getFindBySymbol(this.data.stockListing)
				.subscribe({
					next: response => {
						const exchange = response.exchange;
						console.log('exchange', exchange);

						this.exchangeService
							.getFindByName(decodeURI(exchange))
							.pipe(
								map(response => {
									let currency;
									if (exchange === response.exchangeName) {
										currency = response.currency;
									} else {
										currency = 'EUR';
									}
									return currency;
								}),
								catchError(error => {
									console.error('Error loading data.', error);
									return of('EUR'); // Default to EUR in case of an error
								}),
							)
							.subscribe({
								next: currency => {
									console.log('currency:', currency);
									resolve(currency);
								},
								error: err => {
									console.error(
										'Error in inner subscription:',
										err,
									);
									resolve('EUR'); // Default to EUR in case of an error in the subscription
								},
							});
					},
					error: err => {
						console.error('Error in outer subscription:', err);
						resolve('EUR'); // Default to EUR in case of an error in the subscription
					},
				});
		});
	}

	async createOrder() {
		const orderDto = this.form.value as unknown as OrderDto;

		orderDto.orderActionType = 'BUY';
		orderDto.listingType = 'OPTION';
		try {
			const currency = await this.getCurrency();
			orderDto.securitiesSymbol =
				this.data.stockListing +
				'|' +
				this.data.optionType +
				'|' +
				this.data.strikePrice +
				'|' +
				this.data.settlementDate +
				'|' +
				currency;
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
		} catch (error) {
			console.error('Failed to get currency:', error);
		}
	}
}
