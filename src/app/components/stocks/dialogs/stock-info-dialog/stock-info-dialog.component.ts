import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { digitValidator } from 'src/app/utils/validators/digit.validator';
import { StockDto } from '../../../../dtos/stock-dto';
import { StockService } from '../../../../services/stock-service/stock.service';
import { OrderDto } from 'src/app/dtos/order-dto';
import { OrderService } from 'src/app/services/bank-service/order.service';
import { OptionService } from 'src/app/services/stock-service/option.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
	selector: 'app-stock-info-dialog',
	templateUrl: './stock-info-dialog.component.html',
	styleUrls: ['./stock-info-dialog.component.css'],
})
export class StockInfoDialogComponent {
	form: FormGroup;
	newSelectedRow: StockDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private router: Router,
		private stockService: StockService,
		private optionService: OptionService,
		private orderService: OrderService,
	) {
		this.form = this.fb.group({
			quantity: [null, [Validators.required, digitValidator()]],
			allOrNone: [false],
		});
		this.fetchData();
	}

	fetchData() {
		this.stockService
			.getFindById(this.data.selectedRow.id)
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
		orderDto.listingType = 'STOCK';
		orderDto.securitiesSymbol = this.newSelectedRow.symbol;
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

	viewOptionsPage() {
		const stockListing = this.newSelectedRow.symbol;
		this.optionService
			.getFindAllOptionsByStockListing(stockListing)
			.pipe(
				catchError((error: any) => {
					if (error.status === 404) {
						console.error('StockListing not found:', error);
					} else {
						console.error('Error fetching data:', error);
					}
					return throwError(() => error);
				}),
			)
			.subscribe(() => {
				this.router.navigate(['/options', stockListing]);
			});
	}
}
