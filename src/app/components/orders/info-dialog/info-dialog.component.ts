import {Component, Inject} from '@angular/core';
import {CreditRequestDto} from "../../../dtos/credit-request-dto";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CreditService} from "../../../services/bank-service/credit.service";
import {OrderDto, OrderStatus} from "../../../dtos/order-dto";
import {OrderService} from "../../../services/bank-service/order.service";

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent {
	newSelectedRow: OrderDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private orderService: OrderService,
	) {
		// this.fetchData();

		//! CHANGE
		this.isLoading = false;
	}

	// fetchData() {
	// 	this.orderService
	// 		.getCreditRequestById(this.data.selectedRow.id)
	// 		.subscribe(response => {
	// 			this.data.selectedRow = response;
	// 			this.prepareValues();
	// 			this.isLoading = false;
	// 		});
	// }

	prepareValues() {
		// replace null or empty values with a placeholder
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

	approveOrderReq() {
		this.orderService
			.putApproveOrder(this.newSelectedRow.id)
			.subscribe({
				next: response => {
					console.log(response);
				},
				error: error => {
					console.error(error);
				},
			});
	}

	denyOrderReq() {
		this.orderService
			.putRejectOrder(this.newSelectedRow.id)
			.subscribe({
				next: response => {
					console.log(response);
				},
				error: error => {
					console.error(error);
				},
			});
	}

	protected readonly OrderStatus = OrderStatus;
}
