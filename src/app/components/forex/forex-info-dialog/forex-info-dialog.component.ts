import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { digitValidator } from 'src/app/utils/validators/digit.validator';
import { ForexService } from 'src/app/services/stock-service/forex.service';
import { ForexDto } from 'src/app/dtos/forex-dto';
import { OrderService } from 'src/app/services/bank-service/order.service';
import { OrderDto } from 'src/app/dtos/order-dto';

@Component({
	selector: 'app-forex-info-dialog',
	templateUrl: './forex-info-dialog.component.html',
	styleUrls: ['./forex-info-dialog.component.css'],
})
export class ForexInfoDialogComponent {
	form: FormGroup;
	newSelectedRow: ForexDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private forexService: ForexService,
		private orderService: OrderService,
		private fb: FormBuilder,
	) {
		this.form = this.fb.group({
			quantity: [null, [Validators.required, digitValidator()]],
			limitPrice: [null, [digitValidator()]],
			stopPrice: [null, [digitValidator()]],
			allOrNone: [false],
		});
		this.fetchData();
	}

	fetchData() {
		this.forexService
			.getFindByIdForex(this.data.selectedRow.id)
			.subscribe(response => {
				this.data.selectedRow = response;
				this.prepareValues();
				this.isLoading = false;
			});
	}

	prepareValues() {
		// Replace null or empty values with a placeholder
		for (const key in this.data.selectedRow) {
			if (
				this.data.selectedRow[key] == null ||
				this.data.selectedRow[key] == ''
			) {
				this.data.selectedRow[key] = '-';
			}
		}
		this.newSelectedRow = { ...this.data.selectedRow };
	}

	createOrder() {
		const orderDto = this.form.value as unknown as OrderDto;

		orderDto.orderActionType = 'BUY';
		orderDto.listingType = 'FOREX';
		orderDto.securitiesSymbol = this.newSelectedRow.symbol;
		orderDto.margin = false;

		//if empty == -1
		orderDto.limitPrice = this.form.get('limitPrice')?.value || -1;
		orderDto.stopPrice = this.form.get('stopPrice')?.value || -1;

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
