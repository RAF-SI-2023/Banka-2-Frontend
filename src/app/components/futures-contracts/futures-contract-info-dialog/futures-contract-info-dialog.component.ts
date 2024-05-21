import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { digitValidator } from 'src/app/utils/validators/digit.validator';
import { FuturesContractDto } from 'src/app/dtos/futures-contract-dto';
import { FuturesContractService } from 'src/app/services/stock-service/futures-contract.service';
import { OrderDto } from 'src/app/dtos/order-dto';
import { OrderService } from 'src/app/services/bank-service/order.service';

@Component({
	selector: 'app-futures-contract-info-dialog',
	templateUrl: './futures-contract-info-dialog.component.html',
	styleUrls: ['./futures-contract-info-dialog.component.css'],
})
export class FuturesContractInfoDialogComponent {
	form: FormGroup;
	newSelectedRow: FuturesContractDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private futuresContractService: FuturesContractService,
		private orderService: OrderService,
		private fb: FormBuilder,
	) {
		this.form = this.fb.group({
			quantity: [null, [Validators.required, digitValidator()]],
			allOrNone: [false],
		});
		this.fetchData();
	}

	fetchData() {
		this.futuresContractService
			.getFindByIdFutures(this.data.selectedRow.id)
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
		orderDto.listingType = 'FUTURE';
		orderDto.securitiesSymbol = this.newSelectedRow.name;
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
