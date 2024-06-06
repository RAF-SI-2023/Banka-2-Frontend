import { TestBed } from '@angular/core/testing';

import { BankProfitService } from './bank-profit.service';

describe('BankProfitService', () => {
	let service: BankProfitService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BankProfitService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
