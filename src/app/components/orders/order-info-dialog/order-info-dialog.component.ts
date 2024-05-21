import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderDto, OrderStatus } from '../../../dtos/order-dto';
import { OrderService } from '../../../services/bank-service/order.service';

@Component({
	selector: 'app-order-info-dialog',
	templateUrl: './order-info-dialog.component.html',
	styleUrls: ['./order-info-dialog.component.css'],
})
export class OrderInfoDialogComponent {
	newSelectedRow: OrderDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private orderService: OrderService,
	) {
		this.fetchData();
		this.isLoading = false;
	}

	fetchData() {
		this.orderService
			.getOrderById(this.data.selectedRow.id)
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

	approveOrderReq() {
		this.orderService.putApproveOrder(this.newSelectedRow.id).subscribe({
			next: response => {
				console.log(response);
			},
			error: error => {
				console.error(error);
			},
		});
	}

	denyOrderReq() {
		this.orderService.putRejectOrder(this.newSelectedRow.id).subscribe({
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
