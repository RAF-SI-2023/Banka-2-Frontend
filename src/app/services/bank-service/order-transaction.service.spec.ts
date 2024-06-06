import { TestBed } from '@angular/core/testing';

import { OrderTransactionService } from './order-transaction.service';

describe('OrderTransactionService', () => {
	let service: OrderTransactionService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(OrderTransactionService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
