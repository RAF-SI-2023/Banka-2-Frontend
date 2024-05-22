import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ApiRoutes } from '../api-routes';
import { OrderDto } from 'src/app/dtos/order-dto';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(private httpClient: HttpClient) {}

	// GET
	getAllOrders() {
		return this.httpClient.get<OrderDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.order.getAllOrders}`,
		);
	}

	getNonApprovedOrders() {
		return this.httpClient.get<OrderDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.order.getNonApprovedOrders}`,
		);
	}

	getApprovedOrders() {
		return this.httpClient.get<OrderDto[]>(
			`${environment.bankServiceApiUrl}${ApiRoutes.order.getApprovedOrders}`,
		);
	}

	getOrderById(orderId: number) {
		return this.httpClient.get<OrderDto>(
			environment.bankServiceApiUrl +
				ApiRoutes.order.getOrderById +
				'/' +
				orderId,
		);
	}

	// POST
	postCreateOrder(orderDto: OrderDto) {
		return this.httpClient.post<OrderDto>(
			environment.bankServiceApiUrl + ApiRoutes.order.createOrder,
			orderDto,
		);
	}

	// PUT
	putApproveOrder(orderId: number) {
		return this.httpClient.put<number>(
			environment.bankServiceApiUrl +
				ApiRoutes.order.approveOrder +
				'/' +
				orderId,
			null,
		);
	}

	putRejectOrder(orderId: number) {
		return this.httpClient.put<number>(
			environment.bankServiceApiUrl +
				ApiRoutes.order.rejectOrder +
				'/' +
				orderId,
			null,
		);
	}
}
