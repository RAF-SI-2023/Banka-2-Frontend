import { TestBed } from '@angular/core/testing';

import { BankOtcServiceService } from './bank-otc.service';

describe('BankOtcServiceService', () => {
	let service: BankOtcServiceService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BankOtcServiceService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
