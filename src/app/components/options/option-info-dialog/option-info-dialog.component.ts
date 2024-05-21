import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { digitValidator } from 'src/app/utils/validators/digit.validator';
import { OrderDto } from 'src/app/dtos/order-dto';
import { OrderService } from 'src/app/services/bank-service/order.service';

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
		orderDto.securitiesSymbol = this.data.symbol;
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
