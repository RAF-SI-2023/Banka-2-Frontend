import { TestBed } from '@angular/core/testing';

import { BankTransferTransactionDetailsService } from './bank-transfer-transaction-details.service';

describe('BankTransferTransactionDetailsService', () => {
	let service: BankTransferTransactionDetailsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BankTransferTransactionDetailsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
