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
import { catchError, map } from 'rxjs/operators';
import { isCompanyEmployeeDto } from 'src/app/dtos/company-employee-dto';
import { UserDto } from 'src/app/dtos/user-dto';
import { UserService } from 'src/app/services/iam-service/user.service';
import { Role } from 'src/app/dtos/decoded-token-dto';
import { AuthService } from 'src/app/services/iam-service/auth.service';

@Component({
	selector: 'app-stock-info-dialog',
	templateUrl: './stock-info-dialog.component.html',
	styleUrls: ['./stock-info-dialog.component.css'],
})
export class StockInfoDialogComponent {
	form: FormGroup;
	newSelectedRow: StockDto = { ...this.data.selectedRow };
	isLoading = true;

	activeUser: UserDto | null = null;
	role: Role | null = null;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private router: Router,
		private stockService: StockService,
		private optionService: OptionService,
		private orderService: OrderService,
		private userService: UserService,
		private authService: AuthService,
	) {
		this.form = this.fb.group({
			quantity: [null, [Validators.required, digitValidator()]],
			limitPrice: [null, [digitValidator()]],
			stopPrice: [null, [digitValidator()]],
			allOrNone: [false],
		});
		this.fetchData();
		this.role = this.authService.getRoleFromToken();
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

		//if empty == -1
		orderDto.limitPrice = this.form.get('limitPrice')?.value || -1;
		orderDto.stopPrice = this.form.get('stopPrice')?.value || -1;

		orderDto.securitiesSymbol = this.newSelectedRow.symbol;
		orderDto.margin = false;

		console.log(orderDto);

		this.orderService.postCreateOrder(orderDto).subscribe({
			next: response => {
				console.log(response);
			},
			error: error => {
				console.error(error);
			},
		});
	}

	fetchActiveUserData() {
		this.userService
			.getFindById(Number(localStorage.getItem('id')))
			.pipe(
				map(data => {
					this.activeUser = data;
					return this.activeUser;
				}),
				catchError(error => {
					console.error('Error loading data.', error);
					return throwError(() => error);
				}),
			)
			.subscribe();
	}

	hasPib(): boolean {
		if (this.activeUser && isCompanyEmployeeDto(this.activeUser)) {
			return true;
		}
		return false;
	}

	checkTokenRole(roleArray: string[]) {
		if (!this.role) return false;
		return roleArray.includes(this.role);
	}

	protected readonly Role = Role;

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
