import { TestBed } from '@angular/core/testing';

import { MarginTransactionService } from './margin-transaction.service';

describe('MarginTransactionService', () => {
	let service: MarginTransactionService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MarginTransactionService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
